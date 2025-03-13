import { FC } from "react";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateBaseUtilization } from "./utils/calculations";
import ChargeIcon from "../assets/charges.svg?react";
import { Card } from "./layout/Card";

export const BaseUtilization: FC<{
  chargePoints: number;
  utilizationRate: number;
}> = () => {
  const {
    simulationInput: { chargePoints, utilizationRate },
  } = useSimulationInput();
  const slots = Array.from({ length: chargePoints }, (_, i) => i);
  const baseUtilization = calculateBaseUtilization(
    chargePoints,
    utilizationRate
  );
  return (
    <Card>
      <div className="flex items-center gap-1">
        <ChargeIcon />
        <p className="text-sm text-zinc-300">Base utilization</p>
      </div>
      <div
        className={`grid ${
          slots.length > 25 ? "grid-cols-6" : "grid-cols-5"
        } gap-2 pt-4`}
      >
        {slots.map((slot) => (
          <div
            className={slot < baseUtilization ? "slot slot-active" : "slot"}
            key={slot}
          ></div>
        ))}
      </div>
    </Card>
  );
};
