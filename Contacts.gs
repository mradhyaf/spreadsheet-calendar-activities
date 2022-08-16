const CONTACT_COL = {
  NAME : 0,
  COLOR : 1,
}

function getContacts() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  let contactsSheet = ss.getSheetByName('Kontak');
  let contactsRange = contactsSheet.getRange(1, 1, contactsSheet.getLastRow(), 2);

  let contactsArray = contactsRange.getValues();
  contactsArray.shift();

  function toJSON(json, contact) {
    json[contact[CONTACT_COL.NAME]] = contact[CONTACT_COL.COLOR];

    return json
  }

  let contactsJSON = contactsArray.reduce(toJSON, {});
  console.log('getContacts()', contactsJSON);

  return contactsJSON;
}

const myContacts = getContacts();

function getContactColor(name) {
  return myContacts[name];
}
