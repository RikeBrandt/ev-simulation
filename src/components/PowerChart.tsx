import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";
import {
  calculatePowerUsageOverTime,
  calculateMaxPowerLoad,
} from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { useTimePeriod } from "./context/TimePeriodContext";
import { getXAsisDescription, getXAsisLabelByTimePeriod } from "./utils/labels";
import {
  PRIMARY_CHART_COLOR,
  SECONDARY_CHART_COLOR,
} from "./utils/staticValues";

export const PowerSimulationChart = () => {
  const {
    simulationInput: { chargePoints, arrivalProbability, power },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();

  const powerData = useMemo(
    () =>
      calculatePowerUsageOverTime(
        chargePoints,
        arrivalProbability,
        power,
        timePeriod
      ).map((power, i) => ({
        x: getXAsisLabelByTimePeriod(i, timePeriod),
        y: power,
      })),
    [chargePoints, arrivalProbability, power, timePeriod]
  );

  const chartOptions: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: {
      title: {
        text: getXAsisDescription(timePeriod),
        style: { color: SECONDARY_CHART_COLOR },
      },
      categories: powerData.map((d) => d.x),
      labels: { style: { colors: SECONDARY_CHART_COLOR } },
    },
    yaxis: {
      title: {
        text: "Power Usage (kW)",
        style: { color: SECONDARY_CHART_COLOR },
      },
      max: calculateMaxPowerLoad(chargePoints, power),
      labels: { style: { colors: SECONDARY_CHART_COLOR } },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.8, opacityFrom: 0.8, opacityTo: 0.2 },
    },
    dataLabels: { enabled: false },
    colors: [PRIMARY_CHART_COLOR],
    grid: {
      show: true,
      borderColor: SECONDARY_CHART_COLOR,
    },
    tooltip: { enabled: true, theme: "dark" },
  };

  return (
    <Card>
      <Chart
        options={chartOptions}
        series={[{ name: "Power Usage (kW)", data: powerData }]}
        type="area"
        height={300}
      />
    </Card>
  );
};
