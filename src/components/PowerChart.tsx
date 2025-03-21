import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { Card } from "./layout/Card";
import {
  calculateMaxPowerLoad,
  calculatePowerUsageOverTime,
} from "./utils/calculations";
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
    ...generateChartOptions(
      {
        xAsis: getXAsisDescription(timePeriod),
        yAxis: "Power Usage (kW)",
      },
      calculateMaxPowerLoad(chargePoints, power)
    ),
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.8, opacityFrom: 0.8, opacityTo: 0.2 },
    },
  };

  return (
    <Card className="grow-8 w-full">
      <Chart
        key={JSON.stringify(powerData)}
        options={chartOptions}
        series={[{ name: "Power Usage (kW)", data: powerData }]}
        type="area"
        height={300}
      />
    </Card>
  );
};
