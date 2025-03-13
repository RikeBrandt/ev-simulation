import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";

// Predefined hourly utilization pattern (10% to 140%)
const HOUR_FACTORS = [
  0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.2, 1.4, 1.2, 0.7, 0.6, 0.2,
];

const generatePowerData = (
  chargePoints: number,
  utilizationRate: number,
  powerPerPoint: number
) => {
  return HOUR_FACTORS.map((factor, hour) => {
    const activeChargePoints = Math.min(
      chargePoints * (utilizationRate / 200) * factor,
      chargePoints
    );
    const powerUsage = activeChargePoints * powerPerPoint;
    return { x: `${hour + 6}:00`, y: Math.round(powerUsage) };
  });
};

export const PowerSimulationChart = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power },
  } = useSimulationInput();

  const powerData = useMemo(
    () => generatePowerData(chargePoints, utilizationRate, power),
    [chargePoints, utilizationRate, power]
  );

  const chartOptions = {
    chart: { type: "area", toolbar: { show: false } },
    xaxis: {
      title: { text: "Time of Day" },
      categories: powerData.map((d) => d.x),
    },
    yaxis: {
      title: { text: "Power Usage (kW)" },
      max: chargePoints * power * 1.4,
    },
    stroke: { curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.5, opacityFrom: 0.6, opacityTo: 0.1 },
    },
    dataLabels: { enabled: false },
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
