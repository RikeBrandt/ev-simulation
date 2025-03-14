import React, { createContext, useState, useContext, FC } from "react";
import { DEFAULT_INPUT } from "../utils/staticValues";

export type SimulationInput = {
  chargePoints: number;
  arrivalProbability: number;
  power: number;
  consumption: number;
};

interface SimulationInputContextType {
  simulationInput: SimulationInput;
  setSimulationInput: (value: SimulationInput) => void;
}

const SimulationInputContext = createContext<
  SimulationInputContextType | undefined
>(undefined);

export const SimulationInputProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [simulationInput, setSimulationInput] =
    useState<SimulationInput>(DEFAULT_INPUT);

  return (
    <SimulationInputContext.Provider
      value={{ simulationInput, setSimulationInput }}
    >
      {children}
    </SimulationInputContext.Provider>
  );
};

export const useSimulationInput = (): SimulationInputContextType => {
  const context = useContext(SimulationInputContext);
  if (!context) {
    throw new Error(
      "useSimulationInput must be used within a SimulationInputProvider"
    );
  }
  return context;
};
