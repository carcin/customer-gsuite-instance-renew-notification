# Automatic product renew notification script

Script for automatic customer notification about their G Suite (or whatever) subscription renew.

This script uses Google Spreadsheets for logging a list of customers and information about them. Based on set renew date calculates a number of days until the date of renew.

## Google Spreadsheet

You can set the information in Spredsheet however you need. But in case you are not going to edit the script at all you will need this:

#1. Name of the first sheet "License"

#2. In column "G" get a date with the renew date

#3. In column "I" get number of days until the renew date. You can set it very easily with the function **=(G1-TODAY())**

#4. In column "A" get customer`s domain

#5. In column "N" get customer`s contact email address

#6. In column "O" get blank fields (there will be "YES" in case of sent notification added)

#7. In column "P" get blank fields as well (there will be a date when the notification was sent added)

## Google Script

Go to Tools > Script editor and add the script and edit the information according to the comments inside

Set a trigger to start the function "notification" every day on selected hour span

## Other important information

In case customer will renew the service and you will edit the date of renew, erase the "YES" in column "O", so the notification will be send in the future.

In next version I will add a function that the "YES" will be erased in case of date was edited.
