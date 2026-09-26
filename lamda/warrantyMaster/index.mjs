import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const generateWarrantyTicketId = (serialNumber = "") => {
    const year = new Date().getFullYear();
    const cleanSerial = serialNumber.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const serialTail = cleanSerial.slice(-4) || "UNIT";
    const randomSalt = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `IMMWARR-${year}${serialTail}${randomSalt}`;
};

const fetchFromGoogleSheet = async (scriptUrl, serialNumber, customerMobile) => {
    try {
        const queryParams = new URLSearchParams({
            action: 'lookup',
            serialNumber: String(serialNumber).trim(),
            customerMobile: String(customerMobile).trim(),
            mobile: String(customerMobile).trim(),
        });

        const response = await fetch(`${scriptUrl}?${queryParams.toString()}`, {
            method: 'GET',
            redirect: 'follow',
        });

        const rawText = await response.text();
        try {
            return JSON.parse(rawText);
        } catch (jsonErr) {
            console.error("Non-JSON response received from Google:", rawText.slice(0, 300));
            return { status: "error", message: "Received HTML instead of JSON from Apps Script" };
        }
    } catch (err) {
        console.error('Google Sheet fetch error:', err);
        return { status: 'error', message: err.message };
    }
};

const pushToGoogleSheet = async (scriptUrl, rowData) => {
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(rowData),
        });

        const rawText = await response.text();
        try {
            return JSON.parse(rawText);
        } catch (jsonErr) {
            console.error("Non-JSON response received from Google:", rawText.slice(0, 300));
            return { status: "error", message: "Received HTML instead of JSON" };
        }
    } catch (err) {
        console.error('Google Sheet push error:', err);
        return { status: 'error', message: err.message };
    }
};

export const handler = async (req) => {
    const method = req.httpMethod || req.requestContext?.http?.method || req.method || 'POST';
    const SCRIPT_URL = process.env.APPS_SCRIPT_URL;

    const queryParams = req.queryStringParameters || {};
    
    let parsedBody = {};
    if (req.body) {
        if (typeof req.body === 'object') {
            parsedBody = req.body;
        } else {
            try {
                parsedBody = JSON.parse(req.body);
            } catch (e) {
                console.error("Invalid JSON body:", req.body);
                parsedBody = {};
            }
        }
    }

    const action = queryParams.action || parsedBody.action;
    const lookupSerial = queryParams.serialNumber || parsedBody.serialNumber;
    const lookupMobile = queryParams.customerMobile || queryParams.registeredPhone || parsedBody.registeredPhone || parsedBody.customerMobile || parsedBody.mobile;

    // --- LOOKUP / FETCH WARRANTY ---
    // Accepts GET, action=lookup, and action=fetch_warranty
    if (method === 'GET' || action === 'lookup' || action === 'fetch_warranty') {
        if (!lookupSerial || !lookupMobile) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: 'error',
                    message: 'Both serialNumber and registered phone number are required for warranty lookup.',
                }),
            };
        }

        const sheetResult = await fetchFromGoogleSheet(SCRIPT_URL, lookupSerial, lookupMobile);

        if (sheetResult.status === 'success' && sheetResult.data) {
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: 'success',
                    data: sheetResult.data,
                }),
            };
        }

        return {
            statusCode: sheetResult.statusCode || 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: 'error',
                message: sheetResult.message || 'No warranty record found matching the provided serial and mobile number.',
            }),
        };
    }

    // --- CREATE / EXTENSION REGISTRATION ---
    const {
        customerName,
        customerEmail,
        customerMobile: rawMobile,
        registeredPhone,
        serviceAddress,
        productName,
        serialNumber,
        purchaseDate,
        productMrp,
        productPrice,
        defaultElectronicsWarranty,
        defaultChamberYears,
        planTitle,
        extendedElectronicsWarranty,
        extendedYears,
        extendedChamberYears,
        extendedPrice,
        price,
        ticketId: providedTicketId,
    } = parsedBody;

    const customerMobile = rawMobile || registeredPhone;
    const finalExtendedPrice = extendedPrice !== undefined ? extendedPrice : price;
    const finalDefaultElectronicsWarranty = defaultElectronicsWarranty ?? 0;
    const finalExtendedElectronicsWarranty = extendedElectronicsWarranty ?? extendedYears ?? 0;

    if (!customerName || !customerEmail || !customerMobile || !serialNumber || finalExtendedPrice === undefined) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Missing required warranty fields' }),
        };
    }

    // Check if registration is for default base warranty only
    const numericPrice = Number(String(finalExtendedPrice).replace(/[^0-9.-]+/g, "")) || 0;
    const isDefaultOnly = numericPrice === 0 &&
        (!finalExtendedElectronicsWarranty || Number(finalExtendedElectronicsWarranty) === 0) &&
        (!extendedChamberYears || Number(extendedChamberYears) === 0);

    const ticketId = providedTicketId || generateWarrantyTicketId(serialNumber);

    const sheetRecord = {
        action: 'create',
        ticketId,
        name: customerName,
        mobile: customerMobile,
        email: customerEmail,
        address: serviceAddress || 'N/A',
        productName: productName || 'Immuno+',
        serialNumber,
        purchaseDate: purchaseDate || 'N/A',
        productMrp: productMrp || 'N/A',
        productPrice: productPrice || 'N/A',
        defaultElectronicsWarranty: finalDefaultElectronicsWarranty,
        defaultChamberYears: defaultChamberYears || 0,
        planTitle: planTitle || (isDefaultOnly ? 'Default Base Warranty' : 'Extended Plan'),
        extendedElectronicsWarranty: finalExtendedElectronicsWarranty,
        extendedChamberYears: extendedChamberYears || finalExtendedElectronicsWarranty || 0,
        extendedPrice: finalExtendedPrice,
        paymentStatus: isDefaultOnly ? 'ACTIVE' : 'PENDING',
    };

    await pushToGoogleSheet(SCRIPT_URL, sheetRecord);

    // --- EMAIL COMPOSITION ---
    let customerSubject;
    let customerMessage;

    if (isDefaultOnly) {
        customerSubject = `Welcome to Immuno+ – Warranty Registration Confirmed (${ticketId})`;
        customerMessage = `Dear ${customerName},

Welcome to the Immuno+ family!

Your product warranty registration has been successfully activated. Here are your registration details:

Device & Registration Summary:
  • Reference ID:          ${ticketId}
  • Product Name:          ${productName || 'Immuno+'}
  • Serial Number:         ${serialNumber}
  • Purchase Date:         ${purchaseDate || 'N/A'}
  • Electronics Warranty:  ${finalDefaultElectronicsWarranty}
  • Chamber Warranty:      ${defaultChamberYears || 0} Years
  • Service Address:       ${serviceAddress || 'N/A'}

Warm regards,
Immuno+ Customer Care Team`;
    } else {
        customerSubject = `Warranty Extension Request Received - ${ticketId}`;
        customerMessage = `Hi ${customerName},

Thank you for choosing to extend warranty coverage for your ${productName || 'Immuno+'}.

Request Summary:
  • Ticket Reference:    ${ticketId}
  • Machine Serial No:   ${serialNumber}
  • Plan Selected:       ${planTitle || 'Extended Plan'} (${finalExtendedPrice})
  • Service Address:     ${serviceAddress || 'N/A'}

Next Steps:
Our warranty desk is verifying your machine serial number against our records. An executive will reach out to you via Phone / WhatsApp at ${customerMobile} with payment confirmation instructions to complete activation.

Best regards,
The Immuno+ Warranty Services Team`;
    }

    try {
        if (!isDefaultOnly && process.env.ADMIN_EMAIL) {
            const adminSubject = `Warranty Extension Request [${ticketId}] - ${serialNumber} (${customerName})`;
            const adminMessage = `New Warranty Extension Request
---------------------------------------
Ticket ID:              ${ticketId}
Payment Status:         PENDING

Customer Details:
  Name:                 ${customerName}
  Mobile:               ${customerMobile}
  Email:                ${customerEmail}
  Address:              ${serviceAddress || 'N/A'}

Product Details:
  Product:              ${productName || 'Immuno+'}
  Serial / UID:         ${serialNumber}
  Purchase Date:        ${purchaseDate || 'N/A'}

Extended Plan Details:
  Plan Title:           ${planTitle || 'Extended Plan'}
  Electronics Added:    +${finalExtendedElectronicsWarranty}
  Chamber Added:        +${extendedChamberYears || finalExtendedElectronicsWarranty || 0} Years
  Plan Amount:          ${finalExtendedPrice}
---------------------------------------
Timestamp:              ${new Date().toLocaleString()}`;

            await transporter.sendMail({
                from: `"Immuno+ Warranty Desk" <${process.env.SMTP_USER}>`,
                to: process.env.ADMIN_EMAIL,
                subject: adminSubject,
                text: adminMessage,
                replyTo: customerEmail,
            });
        }

        await transporter.sendMail({
            from: `"Immuno+ Support" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: customerSubject,
            text: customerMessage,
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: 'success',
                ticketId,
                message: isDefaultOnly
                    ? 'Default warranty registered and welcome email sent to customer.'
                    : 'Warranty extension recorded and notifications dispatched.',
            }),
        };
    } catch (err) {
        console.error('Email delivery failure:', err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: 'error',
                ticketId,
                message: 'Recorded in Sheet, but email delivery encountered an issue',
                error: err.message,
            }),
        };
    }
};


async function demo(){
  const data = await fetchFromGoogleSheet(process.env.APPS_SCRIPT_URL, "IMM2026RV8126", "8126936663")
  console.log(data)
}

demo();