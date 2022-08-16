const EID_DELIMITER = ','

function onEditActivities(e) {
  let editRange = e.range;

  let editSheet = editRange.getSheet();

  if (editSheet.getName() == 'Aktivitas') {
    parseEvents(editRange);
  }
}

function parseEvents(editRange) {
  let startRow = editRange.getRow();
  if (startRow == 1) startRow = 2;

  let endRow = editRange.getLastRow();

  for (let i = startRow; i <= endRow; i++) {
    let eventRange = editRange.getSheet().getRange(i, 1, 1, 8);
    let activity = new Activity(eventRange);
    
    if (activity.eids == '') {
      if (!activity.isValid) {
        continue;
      } else {
        addEvent(activity);
      } 
    } else {
      if (!activity.isValid) {
        deleteEvent(activity);
      } else {
        editEvent(activity);
      }
    }
  }
}

function addEvent({ pic, title, start, end, range }) {
  let colorCode = getContactColor(pic)
  let options = {
    description: pic
  }

  console.log('AddEvent()', colorCode);

  let startEvent = myCalendar.createEvent(
      title, start, fiveMinutesAfter(start), options);
  startEvent.setColor(colorCode);

  let endEvent = myCalendar.createEvent(
      title, end, fiveMinutesAfter(end), options);
  endEvent.setColor(colorCode);
  
  let eids = startEvent.getId() + EID_DELIMITER + endEvent.getId();

  range.getCell(1, ACTIVITY_COL.EVENT_ID + 1).setValue(eids);
}

function editEvent({ pic, title, start, end, eids }) {
  let eidArr = eids.split(EID_DELIMITER);
  
  let startEvent = myCalendar.getEventById(eidArr[0]);
  let endEvent = myCalendar.getEventById(eidArr[1]);

  let colorCode = getContactColor(pic)
  
  startEvent.setDescription(pic);
  startEvent.setTitle(title);
  startEvent.setTime(start, fiveMinutesAfter(start));
  startEvent.setColor(colorCode);

  endEvent.setDescription(pic);
  endEvent.setTitle(title);
  endEvent.setTime(end, fiveMinutesAfter(end));
  endEvent.setColor(colorCode);
}

function deleteEvent({ eids, range }) {
  let eidArr = eids.split(EID_DELIMITER);
  
  myCalendar.getEventById(eidArr[0]).deleteEvent();
  myCalendar.getEventById(eidArr[1]).deleteEvent();

  range.getCell(1, ACTIVITY_COL.EVENT_ID + 1).clearContent();
}
