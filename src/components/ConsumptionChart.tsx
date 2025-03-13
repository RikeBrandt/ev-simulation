import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateHourlyEnergyConsumption } from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { Card } from "./layout/Card";

const HOURS = [
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export const EnergyConsumptionChart = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power, consumption },
  } = useSimulationInput();

  const energyData = useMemo(() => {
    return calculateHourlyEnergyConsumption(
      chargePoints,
      utilizationRate,
      power,
      consumption
    );
  }, [chargePoints, utilizationRate, power, consumption]);

  const chartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: HOURS,
      title: { text: "Time of Day", style: { color: "#fff" } },
      labels: { style: { colors: "#fff" } },
    },
    yaxis: {
      title: { text: "Energy Consumption (kWh)", style: { color: "#fff" } },
      labels: { style: { colors: "#fff" } },
    },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
    colors: ["oklch(0.789 0.154 211.53)"],
  };

  return (
    <Card>
      <Chart
        options={chartOptions}
        series={[
          {
            name: "Energy (kWh)",
            data: energyData.map((amount, i) => ({
              x: `${i + 6}:00`,
              y: amount,
            })),
          },
        ]}
        type="bar"
        height={300}
      />
    </Card>
  );
};
