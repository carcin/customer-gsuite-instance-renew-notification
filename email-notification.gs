function notification() {
  
  //how many days until renew
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var licenseSheet = ss.getSheetByName("License");
  var lastRow = licenseSheet.getLastRow();
  var lastColumn = licenseSheet.getLastColumn();
  var remainingDays = licenseSheet.getRange(2, 9, lastRow, 1).getValues();
  var deadline = 30; //you can set any number you need - I have 1 month
  Logger.log(lastRow);
  Logger.log(remainingDays);
  Logger.log(remainingDays.length);
  
  //check every row and send notification in case of condition
  
  for (var i=1; i < remainingDays.length; i++) {
    var remainingDays = licenseSheet.getRange(i+1, 9).getValue();
    var notification = licenseSheet.getRange(i+1, 15).getValue();
    var commitment = licenseSheet.getRange(i+1, 12).getValue();
    var notificationCol = licenseSheet.getRange(i+1, 15);
    var notificationDate = licenseSheet.getRange(i+1, 16);
    Logger.log(commitment);
    Logger.log(notification);
    if  ( remainingDays < deadline &&  commitment != "flexible" && notification != "YES"){ //condition - remaining days has to be lower than deadline and commitment must not be "flexible" and notification column must not include "YES"
     var lastRowValues = licenseSheet.getRange(i, 1, lastRow, lastColumn).getValues();
     var email = lastRowValues[i][13]; //get email contacts
     var remainingDate = lastRowValues[i][6]; //get remaining date
     var domain = lastRowValues[i][0]; //get customer`s domain
     var remainingDateShort = Utilities.formatDate(remainingDate, "GMT+2", "dd.MM.YYYY"); //change date format and timezone on yours
      
      Logger.log(email);
      Logger.log(remainingDateShort);
      
     var emailSubject = "G Suite subscription renew (Google Apps)";
     var emailBody = "Hello, <br /> \
         " + remainingDateShort + " ends your G Suite subscription for domain " + domain + " \
        <p>Please, whould you like to renew the subscription without any change on price and conditions?</p> \
        <p>Thank you very much and have a nice day.</p>\
        David Král <br />\
        Company Ltd. <br />\
        +420 000 000 000 <br />\
        ";
      GmailApp.sendEmail(email,emailSubject,emailBody, {htmlBody: emailBody, replyTo: "email@test.com"}); //change your replyTo email, script sends email from an account which authorized the script
      
      notificationCol.setValue("YES"); //sets notification value to YES to NOT sending the email again
      notificationDate.setValue(new Date ()); //sets date when the notification email was sent
      var notificationPosledni = licenseSheet.getRange(i+1, 16).getValue();
      
      var logSheet = ss.getSheetByName("Log-notification"); //log sent email on sheet "Log-notification"
      logSheet.appendRow([notificationPosledni,email,domain,emailBody]);
    }                        
  }
}
