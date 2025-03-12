import { FC } from "react";
import { useSimulationInput } from "./SimulationInputContext";

export const Occupation: FC<{
  chargePoints: number;
  utilizationRate: number;
}> = () => {
  const {
    simulationInput: { chargePoints, utilizationRate },
  } = useSimulationInput();
  const slots = Array.from({ length: chargePoints }, (_, i) => i);
  const occupiedSlots = Math.round((utilizationRate / 200) * chargePoints);
  return (
    <div>
      <p className="text-xs text-zinc-300">Average occupation</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {slots.map((slot) => (
          <div
            className={slot < occupiedSlots ? "slot slot-active" : "slot"}
            key={slot}
          ></div>
        ))}
      </div>
    </div>
  );
};
