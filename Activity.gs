/**
 * Base-0 column index for activity values.
 */
const ACTIVITY_COL = {
  TITLE : 0,
  PIC : 1,
  START_DATE : 2,
  START_TIME : 3,
  END_DATE : 4,
  END_TIME : 5,
  STATUS : 6,
  EVENT_ID : 7
}

/**
 * Represents a one-row Range containing data of an activity.
 */
class Activity {
  /* 
    ---Activity attributes---
    range range: input range used to construct this activity
    str title: title of this activity
    str pic: person in charge of this activity
    Date start: start date and time of this activity
    Date end: end date and time of this activity
    str eventId: event id of the activity
    bool isValid: boolean of whether the activity is valid for event addition
  */
  constructor(range) {
    this.range = range;
    
    let values = range.getValues()[0];
    // displayValues is used for incorrectly interpreted values (i.e. Time)
    let displayValues = range.getDisplayValues()[0];

    this.title = values[ACTIVITY_COL.TITLE];
    this.pic = values[ACTIVITY_COL.PIC];

    this.start = values[ACTIVITY_COL.START_DATE] instanceof Date
      ? setTimeOfDate(values[ACTIVITY_COL.START_DATE], displayValues[ACTIVITY_COL.START_TIME])
      : '';

    this.end = values[ACTIVITY_COL.END_DATE] instanceof Date
      ? setTimeOfDate(values[ACTIVITY_COL.END_DATE], displayValues[ACTIVITY_COL.END_TIME])
      : '';

    this.status = values[ACTIVITY_COL.STATUS];
    this.eids = values[ACTIVITY_COL.EVENT_ID];
    this.isValid = isFilled(displayValues.slice(0, ACTIVITY_COL.END_TIME + 1));
  }
}
