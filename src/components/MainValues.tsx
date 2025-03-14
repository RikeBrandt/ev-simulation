import { useMemo } from "react";
import BoltRed from "../assets/bolt-red.svg?react";
import BoltGreen from "../assets/bolt-green.svg?react";
import Consumption from "../assets/consumption.svg?react";
import { useSimulationInput } from "./context/SimulationInputContext";
import {
  calculateAveragePowerUsage,
  calculatePowerUsageOverTime,
  calculatePeakPowerLoad,
  calculateTotalEnergyConsumption,
  calculateEnergyConsumptionOverTime,
} from "./utils/calculations";
import { useTimePeriod } from "./context/TimePeriodContext";
import { ValueCard } from "./layout/ValueCard";

export const MainValues = () => {
  const {
    simulationInput: { chargePoints, arrivalProbability, power, consumption },
  } = useSimulationInput();
  const { timePeriod } = useTimePeriod();

  const peakPowerLoad = useMemo(
    () =>
      calculatePeakPowerLoad(
        chargePoints,
        arrivalProbability,
        power,
        timePeriod
      ),
    [arrivalProbability, power, timePeriod]
  );

  const averagePowerLoad = useMemo(
    () =>
      calculateAveragePowerUsage(
        calculatePowerUsageOverTime(
          chargePoints,
          arrivalProbability,
          power,
          timePeriod
        )
      ),
    [chargePoints, arrivalProbability, power, timePeriod]
  );

  const energyConsumption = useMemo(
    () =>
      calculateTotalEnergyConsumption(
        calculateEnergyConsumptionOverTime(
          chargePoints,
          arrivalProbability,
          power,
          consumption,
          timePeriod
        )
      ),
    [chargePoints, arrivalProbability, power, consumption, timePeriod]
  );

  return (
    <div className="flex gap-2 md:gap-4 flex-wrap">
      <ValueCard
        result={`${peakPowerLoad} kW`}
        label="peak power load"
        color="text-red-600"
        icon={<BoltRed />}
      />

      <ValueCard
        result={`${averagePowerLoad} kW`}
        label="avg. power load"
        color="text-green-400"
        icon={<BoltGreen />}
      />

      <ValueCard
        result={`${energyConsumption} kWh`}
        label="total energy consumption"
        color="text-white"
        icon={<Consumption />}
      />
    </div>
  );
};
