import { useSimulationInput } from "./context/SimulationInputContext";
import { calculateBaseUtilization } from "./utils/calculations";
import ChargeIcon from "../assets/charges.svg?react";
import { Card } from "./layout/Card";
import InfoIcon from "../assets/info.svg?react";
import { useState } from "react";

export const BaseUtilization = () => {
  const {
    simulationInput: { chargePoints, arrivalProbability },
  } = useSimulationInput();

  const slots = Array.from({ length: chargePoints }, (_, i) => i);

  const baseUtilization = calculateBaseUtilization(
    chargePoints,
    arrivalProbability
  );

  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <div className="grow md:max-w-[300px]">
      <Card className="h-full">
        <div className="flex items-center gap-1 pb-2">
          <ChargeIcon />
          <p className="text-sm text-zinc-300 text-nowrap">Base utilization</p>
          <div
            onMouseEnter={() => setInfoVisible(true)}
            onMouseLeave={() => setInfoVisible(false)}
          >
            <InfoIcon className="cursor-pointer" />
            <p
              className={`absolute bg-zinc-900 text-xs p-1 rounded-sm border border-zinc-600 ${
                !infoVisible && "hidden"
              }`}
            >
              Play around with the arrival probability to influence the base
              utilization!
            </p>
          </div>
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
