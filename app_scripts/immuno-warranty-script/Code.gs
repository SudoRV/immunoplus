var SPREADSHEET_ID = "1UCVzHDjNSerug7Qcao2QeZIAyRCTdiPOQkEH0JTrChk";

function ensureHeadersExist(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp",
      "Ticket ID",
      "Customer Name",
      "Mobile Number",
      "Email Address",
      "Service Address",
      "Product Name",
      "Serial Number",
      "Product Purchase Date",
      "Product MRP",
      "Product Purchase Price",
      "Default Electronics Warranty",
      "Default Warranty - Chamber (Yrs)",
      "Extended Plan Title",
      "Extended Electronics Warranty",
      "Extended - Chamber (Yrs)",
      "Extended Warranty Price",
      "Payment Status",
      "Warranty Renewed Date"
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#F3F4F6");
    sheet.setFrozenRows(1);
  }
}

// Helper to check if both electronics and chamber warranties have expired
function isWarrantyExpired(row, now) {
  var rawPurchaseDate = row[8];
  if (!rawPurchaseDate) return false;

  var purchaseDate = rawPurchaseDate instanceof Date ? new Date(rawPurchaseDate.getTime()) : new Date(rawPurchaseDate);
  if (isNaN(purchaseDate.getTime())) return false;

  var defaultElec = parseFloat(row[11]) || 0;
  var extElec = parseFloat(row[14]) || 0;
  var totalElecYears = defaultElec + extElec;

  var defaultChamber = parseFloat(row[12]) || 0;
  var extChamber = parseFloat(row[15]) || 0;
  var totalChamberYears = defaultChamber + extChamber;

  // Calculate Expiry Dates
  var elecExpiry = new Date(purchaseDate.getTime());
  elecExpiry.setFullYear(elecExpiry.getFullYear() + totalElecYears);

  var chamberExpiry = new Date(purchaseDate.getTime());
  chamberExpiry.setFullYear(chamberExpiry.getFullYear() + totalChamberYears);

  // Expired only if BOTH electronics and chamber have passed current time
  return now.getTime() > elecExpiry.getTime() && now.getTime() > chamberExpiry.getTime();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();

    // Auto-create header row if sheet is completely empty
    ensureHeadersExist(sheet);

    var data = JSON.parse(e.postData.contents);

    var inputSerial = String(data.serialNumber || "").trim().toUpperCase();
    var inputMobile = String(data.mobile || data.customerMobile || data.registeredPhone || "").replace(/\D/g, "");

    var rawPlanTitle = String(data.planTitle || "");
    var safePlanTitle = rawPlanTitle ? "'" + rawPlanTitle : "";

    var rows = sheet.getDataRange().getValues();
    var latestOldRow = null;
    var latestOldRowIndex = -1;

    // Scan from bottom to top to grab the latest previous record
    if (inputSerial && inputMobile && rows.length > 1) {
      for (var i = rows.length - 1; i >= 1; i--) {
        var rowMobile = String(rows[i][3] || "").replace(/\D/g, "");
        var rowSerial = String(rows[i][7] || "").trim().toUpperCase();

        if (rowSerial === inputSerial && rowMobile.slice(-10) === inputMobile.slice(-10)) {
          latestOldRow = rows[i];
          latestOldRowIndex = i + 1; // 1-based index for Google Sheets
          break;
        }
      }
    }

    var now = new Date();

    // If an existing row exists, check if both electronics and chamber warranties are expired
    if (latestOldRow && latestOldRowIndex !== -1) {
      if (isWarrantyExpired(latestOldRow, now)) {
        // Set Payment Status (Col R / Col 18) to EXPIRED on previous record
        sheet.getRange(latestOldRowIndex, 18).setValue("EXPIRED");
      }
    }

    var renewedDate = latestOldRow ? now : "";

    // Always create a brand new row
    var newRow = [
      now,                                                                        // Col A: Timestamp
      data.ticketId || (latestOldRow ? latestOldRow[1] : "") || "",               // Col B: Ticket ID
      data.name || data.customerName || (latestOldRow ? latestOldRow[2] : "") || "", // Col C: Customer Name
      "'" + (inputMobile || (latestOldRow ? String(latestOldRow[3]).replace(/\D/g, "") : "")), // Col D: Mobile Number
      data.email || data.customerEmail || (latestOldRow ? latestOldRow[4] : "") || "", // Col E: Email Address
      data.address || data.serviceAddress || (latestOldRow ? latestOldRow[5] : "") || "", // Col F: Service Address
      data.productName || (latestOldRow ? latestOldRow[6] : "") || "",            // Col G: Product Name
      inputSerial || (latestOldRow ? latestOldRow[7] : "") || "",                 // Col H: Serial Number
      data.purchaseDate || (latestOldRow ? latestOldRow[8] : "") || "",           // Col I: Product Purchase Date
      data.productMrp || (latestOldRow ? latestOldRow[9] : "") || "",             // Col J: Product MRP
      data.productPrice || (latestOldRow ? latestOldRow[10] : "") || "",          // Col K: Product Purchase Price
      data.defaultElectronicsWarranty !== undefined ? data.defaultElectronicsWarranty : (latestOldRow ? latestOldRow[11] : 0), // Col L: Default Electronics Warranty
      data.defaultChamberYears !== undefined ? data.defaultChamberYears : (latestOldRow ? latestOldRow[12] : 0),               // Col M: Default Chamber (Yrs)
      safePlanTitle || (latestOldRow ? latestOldRow[13] : "") || "",                                                            // Col N: Extended Plan Title
      data.extendedElectronicsWarranty !== undefined ? data.extendedElectronicsWarranty : (latestOldRow ? latestOldRow[14] : 0), // Col O: Extended Electronics Warranty
      data.extendedChamberYears !== undefined ? data.extendedChamberYears : (latestOldRow ? latestOldRow[15] : 0),             // Col P: Extended Chamber (Yrs)
      data.extendedPrice || data.price || (latestOldRow ? latestOldRow[16] : "") || "",                                         // Col Q: Extended Warranty Price
      data.paymentStatus || "PENDING",                                            // Col R: Payment Status
      renewedDate                                                                 // Col S: Warranty Renewed Date
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      action: "created",
      ticketId: newRow[1],
      isRenewal: latestOldRow !== null,
      row: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();

    ensureHeadersExist(sheet);

    var params = e.parameter || {};
    var ticketId = String(params.ticketId || "").trim();
    var serialNumber = String(params.serialNumber || "").trim().toUpperCase();
    var customerMobile = String(params.customerMobile || params.mobile || params.registeredPhone || "").replace(/\D/g, "");

    if (!ticketId && !serialNumber) {
      return ContentService.createTextOutput("Immuno+ Warranty Sheet API is active.")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    var data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "not_found",
        message: "No registry entries found"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Scanning from bottom to top ensures the newest entry matching criteria is returned
    for (var i = data.length - 1; i >= 1; i--) {
      var row = data[i];
      var rowTicketId = String(row[1] || "").trim();
      var rowMobile = String(row[3] || "").replace(/\D/g, "");
      var rowSerialNumber = String(row[7] || "").trim().toUpperCase();

      var matchFound = false;

      if (serialNumber && customerMobile) {
        if (rowSerialNumber === serialNumber && rowMobile.slice(-10) === customerMobile.slice(-10)) {
          matchFound = true;
        }
      } else if (ticketId && rowTicketId === ticketId) {
        matchFound = true;
      } else if (serialNumber && !customerMobile && rowSerialNumber === serialNumber) {
        matchFound = true;
      }

      if (matchFound) {
        var rawPurchaseDate = row[8];
        var formattedPurchaseDate = "";
        if (rawPurchaseDate instanceof Date) {
          formattedPurchaseDate = Utilities.formatDate(rawPurchaseDate, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");
        } else {
          formattedPurchaseDate = String(rawPurchaseDate || "").trim();
        }

        var rawRenewedDate = row[18];
        var formattedRenewedDate = "";
        if (rawRenewedDate instanceof Date) {
          formattedRenewedDate = Utilities.formatDate(rawRenewedDate, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd HH:mm:ss");
        } else {
          formattedRenewedDate = String(rawRenewedDate || "").trim();
        }

        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          data: {
            ticketId: String(row[1] || ""),
            customerName: String(row[2] || ""),
            customerMobile: String(row[3] || "").replace(/^'/, ""),
            customerEmail: String(row[4] || ""),
            customerAddress: String(row[5] || ""),
            productName: String(row[6] || ""),
            variant: "Standard",
            serialNumber: String(row[7] || ""),
            purchaseDate: formattedPurchaseDate,
            productMrp: row[9] || "",
            productPrice: row[10] || "",
            electronicsWarrantyYears: String(row[11] || "2"),
            chamberWarrantyYears: String(row[12] || "5"),
            planTitle: String(row[13] || "").replace(/^'/, ""),
            extendedElectronicsWarranty: row[14] || 0,
            extendedChamberYears: row[15] || 0,
            extendedPrice: row[16] || "",
            paymentStatus: String(row[17] || "PENDING"),
            warrantyRenewedDate: formattedRenewedDate,
            customer: {
              name: row[2],
              mobile: String(row[3] || "").replace(/^'/, ""),
              email: row[4],
              address: row[5]
            },
            product: {
              name: row[6],
              serialNumber: row[7],
              purchaseDate: formattedPurchaseDate,
              mrp: row[9],
              price: row[10]
            },
            defaultWarranty: {
              electronicsWarranty: row[11],
              chamberYears: row[12]
            },
            extendedWarranty: {
              planTitle: String(row[13] || "").replace(/^'/, ""),
              electronicsWarrantyAdded: row[14],
              chamberYearsAdded: row[15],
              price: row[16],
              warrantyRenewedDate: formattedRenewedDate
            }
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "not_found",
      message: "No matching record found for the provided details."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function addColumnNames() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getActiveSheet();
  ensureHeadersExist(sheet);
}
