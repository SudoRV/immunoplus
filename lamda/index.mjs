import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify connection configuration on startup
transporter.verify((error) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('\nSMTP Server is ready to take messages');
    }
});

export const handler = async (event) => {
    // read the type
    const { type, name, email, phone, whatsapp, message, product, quantity, address } = event;
    console.log("\n", type, name, email, phone, whatsapp, message, quantity, address);

    let adminSubject = "";
    let senderSubject = "";
    let adminMessage = "";
    let senderReply = "";

    if (type === "contact_query") {
        // prepare admin message
        adminSubject = `Contact Query - ${name}`;
        adminMessage = `${name} Contacted Us
  
Query:
    ${message}
  
Sender Details:
    - Email: ${email}
    - Phone: ${phone}
    - WhatsApp: ${whatsapp || phone}
  
Date & Time: ${new Date().toLocaleString()}`;

        // prepare sender reply
        senderSubject = "Thank you for reaching out to Immuno+";
        senderReply = `Hi ${name},
  
Thank you for contacting us. We have received your inquiry and our team is currently reviewing the details.
  
One of our representatives will get back to you within 24 to 48 business hours with the information you need.
  
In the meantime, feel free to reply directly to this email if you have any additional details or files to share. You can also browse our latest products and documentation here: [Link to Website/Catalog].
  
Best regards,
    The Immuno+ Team
    immunoplus.in`;
    }
    else if (type === "join_query") {
        // prepare admin message
        adminSubject = `Join Query - ${name}`;
        adminMessage = `Join Query from: ${name}
  
Query:
    ${message}
  
Sender Details:
    - Email: ${email}
    - Phone: ${phone}
    - WhatsApp: ${whatsapp || phone}
  
Date & Time: ${new Date().toLocaleString()}`;

        // prepare sender reply
        senderSubject = "Thank you for showing interest to Immuno+ Community";
        senderReply = `Hi ${name},
  
Thank you for your interest in joining the Immuno+ network. We have received your partnership inquiry and our team is currently reviewing your application details.
  
Our onboarding specialist will review your profile and get in touch within 24 to 48 business hours to discuss the next steps and potential collaboration.
  
In the meantime, feel free to reply directly to this email if you have any supporting documents, business credentials, or further details to share. You can also explore more about our products and partner ecosystem at immunoplus.in.
  
Best regards,
    The Immuno+ Team
    immunoplus.in`;
    }
    else if (type === "quotation_query") {
        // prepare admin message
        adminSubject = `Quotation Query - ${product?.name} ${product.variant} (${name})`;
        adminMessage = `New Quotation Request
  
Product Details:
    - Product: ${product?.name || 'N/A'} ${product?.variant || ''}
    - Base Price: ${product?.price ? `Rs ${product.price}` : 'Not specified'}
  
Customer Details:
    - Name: ${name}
    - Email: ${email}
    - Phone: ${phone}
    - WhatsApp: ${whatsapp || phone}
  
Date & Time: ${new Date().toLocaleString()}`;

        // prepare sender reply
        senderSubject = `Quotation Request Received - ${product?.name} ${product.variant}`;
        senderReply = `Hi ${name},
  
Thank you for requesting a quotation for ${product.name} ${product.variant}. We have received your request, and our sales team is currently reviewing the pricing and specifications.
  
A tailored quotation along with complete product details and delivery schedules will be sent to your email within 24 business hours.
  
If you have custom requirements, bulk volume queries, or urgent deadlines, you can reply directly to this email or reach us on WhatsApp at +91 9762170838.
  
Best regards,
    The Immuno+ Sales Team
    immunoplus.in`;
    }
    else if (type === "order_query") {
        const qty = Number(quantity) || 1;
        const estimatedTotal = product?.price ? Number(product.price) * qty : null;

        // prepare admin message
        adminSubject = `Order Query - ${product?.name} ${product.variant} (${name})`;
        adminMessage = `New Direct Order Placement
  
Order Details:
    - Product: ${product?.name} ${product?.variant}
    - Unit Price: ${product?.price ? `Rs ${product.price}` : 'N/A'}
    - Quantity: ${qty}
    - Estimated Total: ${estimatedTotal ? `Rs ${estimatedTotal}` : 'To be confirmed'}
  
Customer & Delivery Details:
    - Name: ${name}
    - Email: ${email}
    - Phone: ${phone}
    - WhatsApp: ${whatsapp || phone}
    - Delivery Address:
        ${address}
  
Date & Time: ${new Date().toLocaleString()}`;

        // prepare sender reply
        senderSubject = `Order Received - ${product?.name} ${product.variant}`;
        senderReply = `Hi ${name},
  
Thank you for placing your order with Immuno+ for ${product?.name} ${product.variant}. We have received your order request and shipping details.
  
Order Summary:
    • Item: ${product?.name || 'N/A'} ${product?.variant || ''}
    • Quantity: ${qty}
    ${estimatedTotal ? `• Total Amount: Rs ${estimatedTotal}\n` : ''}

    Our fulfillment team is reviewing your order to verify stock availability and shipping logistics. We will reach out shortly via phone/WhatsApp to confirm your delivery and finalize payment processing.
  
If you need to make any changes to your shipping address or quantity, reply directly to this email or reach us on WhatsApp at +91 9762170838.
  
Best regards,
    The Immuno+ Operations Team
    immunoplus.in`;
    }

    // gmail api
    try {
        // Email to admin
        const adminInfo = await transporter.sendMail({
            from: `"Immuno+ Alerts" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: adminSubject,
            text: adminMessage,
            replyTo: email
        });

        console.log("\nEmail sent successfully to admin!");
        console.log("Message ID:", adminInfo.messageId);
        console.log("Server response:", adminInfo.response);

        // Confirmation email to customer
        const customerInfo = await transporter.sendMail({
            from: `"Immuno+" <${process.env.SMTP_USER}>`,
            to: email,
            subject: senderSubject,
            text: senderReply,
        });

        console.log("\nConfirmation email sent successfully!");
        console.log("Message ID:", customerInfo.messageId);
        console.log("Server response:", customerInfo.response);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Query sent successfully"
            })
        };

    } catch (error) {

        console.error("Failed to send email:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to send email",
                error: error.message
            })
        };
    }

    // whatsapp api
};


const response = handler({
    "type": "join_query",
    "name": "Rahul Verma",
    "email": "rahulverma.1.2005@gmail.com",
    "phone": "+918126936663",
    "whatsapp": "+918126936663",
    "message": "Its a test"
})

// console.log(response)