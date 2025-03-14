import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateEnergyConsumptionOverTime } from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { Card } from "./layout/Card";
import { useTimePeriod } from "./context/TimePeriodContext";
import { getXAsisDescription, getXAsisLabelByTimePeriod } from "./utils/labels";
import {
  PRIMARY_CHART_COLOR,
  SECONDARY_CHART_COLOR,
} from "./utils/staticValues";

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
    xaxis: {
      categories: energyData.map((d) => d.x),
      title: {
        text: getXAsisDescription(timePeriod),
        style: { color: SECONDARY_CHART_COLOR },
      },
      labels: { style: { colors: SECONDARY_CHART_COLOR } },
    },
    yaxis: {
      title: {
        text: "Energy Consumption (kWh)",
        style: { color: SECONDARY_CHART_COLOR },
      },
      labels: { style: { colors: SECONDARY_CHART_COLOR } },
    },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
    colors: [PRIMARY_CHART_COLOR],
    grid: {
      show: true,
      borderColor: SECONDARY_CHART_COLOR,
    },
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
