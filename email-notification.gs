function notification() {
  
  //how many days until renew
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var licenseSheet = ss.getSheetByName("License");
  var lastRow = licenseSheet.getLastRow();
  var lastColumn = licenseSheet.getLastColumn();
  var remainingDays = licenseSheet.getRange(1, 9, lastRow, 1).getValues();
  var pocetZakazniku = remainingDays.length;
  var deadline = 30; //you can set any number you need - I have 1 month
  Logger.log(lastRow);
  Logger.log(remainingDays);
  Logger.log(remainingDays.length);
  
  //check every row and send notification in case of condition
  
  for (var i=1; i < pocetZakazniku; i++) {
    var remainingDays = licenseSheet.getRange(i, 9).getValue();
    Logger.log(remainingDays);
    var notification = licenseSheet.getRange(i, 15).getValue();
    var commitment = licenseSheet.getRange(i, 12).getValue();
    var notificationCol = licenseSheet.getRange(i, 15);
    var notificationDate = licenseSheet.getRange(i, 16);
    Logger.log(commitment);
    Logger.log(notification);
    if  ( remainingDays == deadline &&  commitment != "flexible" && notification != "YES"){ //condition - remaining days has to be deadline and commitment must not be "flexible" and notification column must not include "YES"
      var email = licenseSheet.getRange(i, 14).getValue();
      var remainingDate = licenseSheet.getRange(i, 7).getValue();
      var domain = licenseSheet.getRange(i, 1).getValue();
     var remainingDateShort = Utilities.formatDate(remainingDate, "GMT+2", "dd.MM.YYYY"); //change date format and timezone on yours
      
      Logger.log(email);
      Logger.log(remainingDateShort);
      
     var emailSubject = "G Suite subscription renew (Google Apps)";
     var emailBody = "Hello, <br /> \
         " + remainingDateShort + " ends your G Suite subscription for domain " + domain + " \
        <p>Please, would you like to renew the subscription without any change on price and conditions?</p> \
        <p>Thank you very much and have a nice day.</p>\
        David Král <br />\
        Company Ltd. <br />\
        +420 000 000 000 <br />\
        ";
      GmailApp.sendEmail(email,emailSubject,emailBody, {htmlBody: emailBody, replyTo: "email@test.com"}); //change your replyTo email, script sends email from an account which authorized the script
      
      notificationCol.setValue("YES"); //sets notification value to YES to NOT sending the email again
      notificationDate.setValue(new Date ()); //sets date when the notification email was sent
      var notificationLast = licenseSheet.getRange(i, 16).getValue();
      
      var logSheet = ss.getSheetByName("Log-notification"); //log sent email on sheet "Log-notification"
      logSheet.appendRow([notificationLast,email,domain,emailBody]);
    }                        
  }
}
