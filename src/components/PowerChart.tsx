import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";
import {
  calculateHourlyPowerUsage,
  calculateMaxPowerLoad,
} from "./utils/calculations";
import { ApexOptions } from "apexcharts";

export const PowerSimulationChart = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power },
  } = useSimulationInput();

  const powerData = useMemo(
    () =>
      calculateHourlyPowerUsage(chargePoints, utilizationRate, power).map(
        (power, i) => ({ x: `${i + 6}:00`, y: power })
      ),
    [chargePoints, utilizationRate, power]
  );

  const chartOptions: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: {
      title: { text: "Time of Day", style: { color: "#90A4AE" } },
      categories: powerData.map((d) => d.x),
      labels: { style: { colors: "#90A4AE" } },
    },
    yaxis: {
      title: { text: "Power Usage (kW)", style: { color: "#90A4AE" } },
      max: calculateMaxPowerLoad(chargePoints, power),
      labels: { style: { colors: "#90A4AE" } },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.8, opacityFrom: 0.8, opacityTo: 0.2 },
    },
    dataLabels: { enabled: false },
    colors: ["oklch(0.789 0.154 211.53)"],
    grid: {
      show: true,
      borderColor: "#90A4AE",
    },
    tooltip: { enabled: true, theme: "dark" },
  };

  return (
    <Card>
      <div className="w-full max-w-4xl mx-auto p-4">
        <Chart
          options={chartOptions}
          series={[{ name: "Power Usage", data: powerData }]}
          type="area"
          height={350}
        />
      </div>
    </Card>
  );
};
