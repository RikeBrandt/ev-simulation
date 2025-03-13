import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";
import {
  calculatePowerUsage,
  calculateMaxPowerLoad,
} from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { useTimePeriod } from "./context/TimePeriodContext";
import { getXAsisDescription, getXLabelByTimePeriod } from "./utils/labels";

export const secondaryChartColor = "#90A4AE";
export const primaryChartColor = "oklch(0.789 0.154 211.53)";

export const PowerSimulationChart = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();

  const powerData = useMemo(
    () =>
      calculatePowerUsage(chargePoints, utilizationRate, power, timePeriod).map(
        (power, i) => ({ x: getXLabelByTimePeriod(i, timePeriod), y: power })
      ),
    [chargePoints, utilizationRate, power, timePeriod]
  );

  const chartOptions: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: {
      title: {
        text: getXAsisDescription(timePeriod),
        style: { color: secondaryChartColor },
      },
      categories: powerData.map((d) => d.x),
      labels: { style: { colors: secondaryChartColor } },
    },
    yaxis: {
      title: {
        text: "Power Usage (kW)",
        style: { color: secondaryChartColor },
      },
      max: calculateMaxPowerLoad(chargePoints, power),
      labels: { style: { colors: secondaryChartColor } },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.8, opacityFrom: 0.8, opacityTo: 0.2 },
    },
    dataLabels: { enabled: false },
    colors: [primaryChartColor],
    grid: {
      show: true,
      borderColor: secondaryChartColor,
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
