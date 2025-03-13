import { FC } from "react";
import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateBaseUtilization } from "./utils/calculations";

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
    <div>
      <p className="text-sm text-zinc-300">Base utilization</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {slots.map((slot) => (
          <div
            className={slot < baseUtilization ? "slot slot-active" : "slot"}
            key={slot}
          ></div>
        ))}
      </div>
    </div>
  );
};
