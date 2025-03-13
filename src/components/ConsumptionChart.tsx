import { useMemo } from "react";
import Chart from "react-apexcharts";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateHourlyEnergyConsumption } from "./utils/calculations";
import { ApexOptions } from "apexcharts";
import { Card } from "./layout/Card";
import { useTimePeriod } from "./context/TimePeriodContext";
import { primaryChartColor, secondaryChartColor } from "./PowerChart";
import { getXAsisDescription, getXLabelByTimePeriod } from "./utils/labels";

export const EnergyConsumptionChart = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power, consumption },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();

  const energyData = useMemo(() => {
    return calculateHourlyEnergyConsumption(
      chargePoints,
      utilizationRate,
      power,
      consumption,
      timePeriod
    ).map((energy, i) => ({
      x: getXLabelByTimePeriod(i, timePeriod),
      y: energy,
    }));
  }, [chargePoints, utilizationRate, power, consumption, timePeriod]);

  const chartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: energyData.map((d) => d.x),
      title: {
        text: getXAsisDescription(timePeriod),
        style: { color: secondaryChartColor },
      },
      labels: { style: { colors: secondaryChartColor } },
    },
    yaxis: {
      title: {
        text: "Energy Consumption (kWh)",
        style: { color: secondaryChartColor },
      },
      labels: { style: { colors: secondaryChartColor } },
    },
    tooltip: { theme: "dark" },
    dataLabels: { enabled: false },
    colors: [primaryChartColor],
    grid: {
      show: true,
      borderColor: secondaryChartColor,
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
