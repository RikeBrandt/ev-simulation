import { FC, ReactNode, useMemo } from "react";
import { Card } from "./layout/Card";
import BoltRed from "../assets/bolt-red.svg?react";
import BoltGreen from "../assets/bolt-green.svg?react";
import Consumption from "../assets/consumption.svg?react";
import Charges from "../assets/charges.svg?react";
import { useSimulationInput } from "./context/SimulationInputContext";
import {
  calculateMaxPowerLoad,
  calculateUsedChargingStations,
} from "./utils/calculations";

export const MainNumbers = () => {
  const {
    simulationInput: { chargePoints, utilizationRate, power, consumption },
  } = useSimulationInput();
  const occupiedSlots = useMemo(
    () => calculateUsedChargingStations(chargePoints, utilizationRate),
    [chargePoints, utilizationRate]
  );

  const peakPowerLoad = useMemo(
    () => calculateMaxPowerLoad(chargePoints, occupiedSlots, power),
    [occupiedSlots, power]
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
          result={"70 kW"}
          label="avg. power load"
          color="text-green-400"
          icon={<BoltGreen />}
        />
      </Card>

      <Card>
        <ComputationDisplay
          result={"1200 kWh"}
          label="total energy consumption"
          color="text-white"
          icon={<Consumption />}
        />
      </Card>

      <Card>
        <ComputationDisplay
          result={"35"}
          label="Charging events"
          color="text-white"
          icon={<Charges />}
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
