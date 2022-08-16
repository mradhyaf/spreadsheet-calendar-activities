function setTimeOfDate(date, timeStr) {
  let timeValues = timeStr.split(":");
  let hours = timeValues[0];
  let minutes = timeValues[1];

  date.setHours(hours, minutes, 0);

  return date;
}

function fiveMinutesAfter(date) {
  let newDate = new Date(date);

  newDate.setMinutes(date.getMinutes() + 5);

  return newDate;
}

function isFilled(values) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] == '') {
      return false;
    }
  }

  return true;
}
