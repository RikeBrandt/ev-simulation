import { TimePeriod } from "../context/TimePeriodContext";

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getXAsisLabelByTimePeriod(
  index: number,
  timePeriod: TimePeriod
) {
  switch (timePeriod) {
    case "DAY":
      return `${index + 6}:00`;
    case "WEEK":
      return week[index];
    case "MONTH":
      return index;
  }
}

export function getXAsisDescription(timePeriod: TimePeriod) {
  switch (timePeriod) {
    case "DAY":
      return "Time of day";
    case "WEEK":
      return "Day of the week";
    case "MONTH":
      return "Day of the month";
  }
}
