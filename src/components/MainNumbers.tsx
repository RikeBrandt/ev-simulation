import { FC, ReactNode, useMemo } from "react";
import { Card } from "./layout/Card";
import BoltRed from "../assets/bolt-red.svg?react";
import BoltGreen from "../assets/bolt-green.svg?react";
import Consumption from "../assets/consumption.svg?react";
import { useSimulationInput } from "./context/SimulationInputContext";
import {
  calculateAveragePowerUsage,
  calculatePowerUsage,
  calculatePeakPowerLoad,
  calculateBaseUtilization,
  calculateTotalEnergyConsumption,
  calculateHourlyEnergyConsumption,
} from "./utils/calculations";
import { useTimePeriod } from "./context/TimePeriodContext";

export const MainNumbers = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power, consumption },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();
  const baseUtilization = useMemo(
    () => calculateBaseUtilization(chargePoints, utilizationRate),
    [chargePoints, utilizationRate]
  );

  const peakPowerLoad = useMemo(
    () =>
      calculatePeakPowerLoad(chargePoints, baseUtilization, power, timePeriod),
    [baseUtilization, power, timePeriod]
  );

  const averagePowerLoad = useMemo(
    () =>
      calculateAveragePowerUsage(
        calculatePowerUsage(chargePoints, utilizationRate, power, timePeriod)
      ),
    [chargePoints, utilizationRate, power, timePeriod]
  );

  const energyConsumption = useMemo(
    () =>
      calculateTotalEnergyConsumption(
        calculateHourlyEnergyConsumption(
          chargePoints,
          utilizationRate,
          power,
          consumption,
          timePeriod
        )
      ),
    [chargePoints, utilizationRate, power, consumption, timePeriod]
  );

  return (
    <div className="flex gap-4">
      <Card>
        <ComputationDisplay
          result={`${peakPowerLoad} kW`}
          label="peak power load"
          color="text-red-600"
          icon={<BoltRed />}
        />
      </Card>

      <Card>
        <ComputationDisplay
          result={`${averagePowerLoad} kw`}
          label="avg. power load"
          color="text-green-400"
          icon={<BoltGreen />}
        />
      </Card>

      <Card>
        <ComputationDisplay
          result={`${energyConsumption} kWh`}
          label="total energy consumption"
          color="text-white"
          icon={<Consumption />}
        />
      </Card>
    </div>
  );
};

const ComputationDisplay: FC<{
  result: string;
  label: string;
  color: string;
  icon: ReactNode;
}> = ({ result, label, color, icon }) => {
  return (
    <div>
      <div className={`flex items-center gap-1 ${color} text-xl font-bold`}>
        {icon} {result}
      </div>
      <p className="text-xs text-zinc-300 pl-1">{label}</p>
    </div>
  );
};
