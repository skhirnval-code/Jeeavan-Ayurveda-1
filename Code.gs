const SHEET_NAME = "Leads";

/**
 * Website खोलने पर Index.html दिखाई देगा
 */
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile("Index")
    .setTitle("Jeevan Ayurveda")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Website form से आने वाली customer enquiry
 * Google Sheet में save होगी
 */
function submitForm(data) {

  try {

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    let sheet = spreadsheet.getSheetByName(SHEET_NAME);


    // अगर Leads नाम की sheet नहीं है तो automatically बनाएगा
    if (!sheet) {

      sheet = spreadsheet.insertSheet(SHEET_NAME);

    }


    // पहली बार headings बनाएगा
    if (sheet.getLastRow() === 0) {

      sheet.appendRow([
        "Date & Time",
        "Name",
        "Mobile",
        "Requirement",
        "City",
        "Address",
        "District",
        "State",
        "Pincode",
        "Message"
      ]);

    }


    // Form का data Google Sheet में save
    sheet.appendRow([

      new Date(),

      data.name || "",

      data.phone || "",

      data.requirement || "",

      data.city || "",

      data.address || "",

      data.district || "",

      data.state || "",

      data.pincode || "",

      data.message || ""

    ]);


    return {
      status: "success",
      message: "Form successfully submitted"
    };


  } catch (error) {

    console.error(error);

    return {
      status: "error",
      message: error.toString()
    };

  }

}
