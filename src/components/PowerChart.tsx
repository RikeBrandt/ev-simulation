import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";
import { calculatePowerUsageOverTime } from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { useTimePeriod } from "./context/TimePeriodContext";
import {
  generateChartOptions,
  getXAsisDescription,
  getXAsisLabelByTimePeriod,
} from "./utils/charts";

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
    ...generateChartOptions({
      xAsis: getXAsisDescription(timePeriod),
      yAxis: "Power Usage (kW)",
    }),
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.8, opacityFrom: 0.8, opacityTo: 0.2 },
    },
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
