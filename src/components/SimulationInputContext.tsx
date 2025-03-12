import React, { createContext, useState, useContext, FC } from "react";

export type SimulationInput = {
  chargePoints: number;
  utilizationRate: number;
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
  const [simulationInput, setSimulationInput] = useState<SimulationInput>({
    chargePoints: 20,
    utilizationRate: 100,
    power: 11,
    consumption: 18,
  });

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
