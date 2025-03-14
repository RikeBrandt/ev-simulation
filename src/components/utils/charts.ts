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

export function generateChartOptions(
  data: { x: number | string; y: number }[],
  description: { xAsis: string; yAxis: string }
) {
  const titleStyle = {
    style: {
      color: "var(--chart-gray)",
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      fontWeight: 300,
    },
  };
  const labelsStyle = { labels: { style: { colors: "var(--chart-gray)" } } };
  return {
    xaxis: {
      categories: data.map((d) => d.x),
      title: {
        text: description.xAsis,
        ...titleStyle,
      },
      ...labelsStyle,
    },
    yaxis: {
      title: {
        text: description.yAxis,
        ...titleStyle,
      },
      ...labelsStyle,
    },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
    colors: ["oklch(0.789 0.154 211.53)"],
    grid: {
      show: true,
      borderColor: "var(--chart-gray)",
    },
  };
}
