import { useEffect, useState } from "react";
import { NumberInput } from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";
import RangeInput from "./inputs/RangeInput";
import { useSimulationInput } from "./context/SimulationInputContext";
import {
  DEFAULT_INPUT,
  MAX_ARRIVAL_PROBABILITY,
  MIN_ARRIVAL_PROBABILITY,
} from "./utils/staticValues";
import {
  calculateTotalChargingStations,
  convertClustersToAveragePower,
} from "./utils/calculations";
import CloseIcon from "../assets/close.svg?react";
import PlusIcon from "../assets/plus.svg?react";

export type ChargingCluster = {
  amount: number;
  power: number;
};

export const InputForm = () => {
  const { setSimulationInput } = useSimulationInput();

  const [chargingClusters, setChargingClusters] = useState<ChargingCluster[]>([
    { amount: DEFAULT_INPUT.chargePoints, power: DEFAULT_INPUT.power },
  ]);

  const [consumption, setConsumption] = useState(DEFAULT_INPUT.consumption);
  const [arrivalProbability, setarrivalProbability] = useState(
    DEFAULT_INPUT.arrivalProbability
  );

  const addChargingCluster = () => {
    setChargingClusters([...chargingClusters, { amount: 3, power: 22 }]);
  };

  const updateChargingCluster = (
    index: number,
    key: "amount" | "power",
    value: number
  ) => {
    setChargingClusters((prev) =>
      prev.map((station, i) =>
        i === index ? { ...station, [key]: value } : station
      )
    );
  };

  const removeChargeStation = (index: number) => {
    if (chargingClusters.length === 1) return;
    setChargingClusters((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSimulationInput({
      chargePoints: calculateTotalChargingStations(chargingClusters),
      power: convertClustersToAveragePower(chargingClusters),
      consumption,
      arrivalProbability,
    });
  }, [chargingClusters, consumption, arrivalProbability, setSimulationInput]);

  return (
    <div className="flex flex-col gap-8 min-w-[220px]">
      <h3 className="font-semibold">Customize your Scenario</h3>

      <div className="flex flex-col gap-2 items-start">
        {chargingClusters.map((cluster, index) => (
          <div key={index} className="flex gap-4 items-start">
            <NumberInput
              value={cluster.amount}
              setValue={(value: number) =>
                updateChargingCluster(index, "amount", value)
              }
              label={"Number of charge points"}
            />

            <SelectInput
              value={cluster.power}
              onChange={(value) => updateChargingCluster(index, "power", value)}
              label="Charging Power"
              options={[
                { value: 7, label: "7 kW" },
                { value: 11, label: "11 kW" },
                { value: 22, label: "22 kW" },
                { value: 50, label: "50 kW" },
              ]}
            />

            {chargingClusters.length > 1 && (
              <button
                onClick={() => removeChargeStation(index)}
                className="pb-3"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        ))}

        <button onClick={addChargingCluster} className="pt-2">
          <div className="flex button-gradient rounded-md py-1 px-2 text-black font-medium">
            <PlusIcon /> Add charging cluster
          </div>
        </button>
      </div>

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
  );
};
