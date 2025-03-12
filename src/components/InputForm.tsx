import { useState } from "react";
import { NumberInput } from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";
import { Card } from "./Card";
import RangeInput from "./inputs/RangeInput";

export const InputForm = () => {
  const [chargePoints, setChargePoints] = useState(20);
  const [power, setPower] = useState(11);
  const [consumption, setConsumption] = useState(18);
  const [utilizationRate, setUtilizationRate] = useState(100);

  return (
    <Card>
      <div className="flex flex-col gap-5 ">
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
            { value: 7, label: "7 kWh" },
            { value: 18, label: "18 kWh" },
            { value: 15, label: "20 kWh" },
          ]}
        />

        <RangeInput
          value={utilizationRate}
          onChange={setUtilizationRate}
          label="Utilization rate"
        />
      </div>
    </Card>
  );
};
