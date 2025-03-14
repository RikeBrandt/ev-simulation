import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateEnergyConsumptionOverTime } from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { Card } from "./layout/Card";
import { useTimePeriod } from "./context/TimePeriodContext";
import {
  generateChartOptions,
  getXAsisDescription,
  getXAsisLabelByTimePeriod,
} from "./utils/charts";

export const EnergyConsumptionChart = () => {
  const {
    simulationInput: { chargePoints, arrivalProbability, power, consumption },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();

  const energyData = useMemo(() => {
    return calculateEnergyConsumptionOverTime(
      chargePoints,
      arrivalProbability,
      power,
      consumption,
      timePeriod
    ).map((energy, i) => ({
      x: getXAsisLabelByTimePeriod(i, timePeriod),
      y: energy,
    }));
  }, [chargePoints, arrivalProbability, power, consumption, timePeriod]);

  const chartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    ...generateChartOptions({
      xAsis: getXAsisDescription(timePeriod),
      yAxis: "Energy Consumption (kWh)",
    }),
  };

  return (
    <Card>
      <Chart
        options={chartOptions}
        series={[
          {
            name: "Energy (kWh)",
            data: energyData,
          },
        ]}
        type="bar"
        height={300}
      />
    </Card>
  );
};
