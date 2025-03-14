import { useEffect, useState } from "react";
import { NumberInput } from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";
import { Card } from "./layout/Card";
import RangeInput from "./inputs/RangeInput";
import { useSimulationInput } from "./context/SimulationInputContext";
import {
  MAX_ARRIVAL_PROBABILITY,
  MIN_ARRIVAL_PROBABILITY,
} from "./utils/staticValues";

export const InputForm = () => {
  const { setSimulationInput } = useSimulationInput();

  const [chargePoints, setChargePoints] = useState(20);
  const [power, setPower] = useState(11);
  const [consumption, setConsumption] = useState(18);
  const [arrivalProbability, setarrivalProbability] = useState(100);

  useEffect(() => {
    setSimulationInput({
      chargePoints,
      power,
      consumption,
      arrivalProbability,
    });
  }, [chargePoints, power, consumption, arrivalProbability]);

  return (
    <Card>
      <div className="flex flex-col gap-5 min-w-[220px]">
        <p>Input Parameters</p>

        <NumberInput
          value={chargePoints}
          setValue={setChargePoints}
          label="Number of charge points"
        />

        <SelectInput
          value={power}
          onChange={setPower}
          label="Charging Power"
          options={[
            { value: 7, label: "7 kW" },
            { value: 11, label: "11 kW" },
            { value: 15, label: "15 kW" },
          ]}
        />

        <SelectInput
          value={consumption}
          onChange={setConsumption}
          label="Average consumption per car"
          options={[
            { value: 7, label: "11 kWh" },
            { value: 18, label: "18 kWh" },
            { value: 15, label: "20 kWh" },
          ]}
        />

        <RangeInput
          value={arrivalProbability}
          onChange={setarrivalProbability}
          label="Arrival Probability"
          min={MIN_ARRIVAL_PROBABILITY}
          max={MAX_ARRIVAL_PROBABILITY}
        />
      </div>
    </Card>
  );
};
