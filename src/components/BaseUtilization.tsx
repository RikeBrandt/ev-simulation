import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateBaseUtilization } from "./utils/calculations";
import ChargeIcon from "../assets/charges.svg?react";
import { Card } from "./layout/Card";

export const BaseUtilization = () => {
  const {
    simulationInput: { chargePoints, arrivalProbability },
  } = useSimulationInput();

  const slots = Array.from({ length: chargePoints }, (_, i) => i);

  const baseUtilization = calculateBaseUtilization(
    chargePoints,
    arrivalProbability
  );

  return (
    <div className="grow md:max-w-[300px]">
      <Card className="h-full">
        <div className="flex items-center gap-1 pb-2">
          <ChargeIcon />
          <p className="text-sm text-zinc-300 text-nowrap">Base utilization</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <div
              className={slot < baseUtilization ? "slot slot-active" : "slot"}
              key={slot}
            ></div>
          ))}
        </div>
      </Card>
    </div>
  );
};
