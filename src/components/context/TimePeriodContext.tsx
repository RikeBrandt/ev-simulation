import React, { createContext, useState, useContext, FC } from "react";

export const timePeriods = ["DAY", "WEEK", "MONTH"] as const;

export type TimePeriod = (typeof timePeriods)[number];

interface TimePeriodContextType {
  timePeriod: TimePeriod;
  setTimePeriod: (value: TimePeriod) => void;
}

const TimePeriodContext = createContext<TimePeriodContextType | undefined>(
  undefined
);

export const TimePeriodProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("DAY");

  return (
    <TimePeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
      {children}
    </TimePeriodContext.Provider>
  );
};

export const useTimePeriod = (): TimePeriodContextType => {
  const context = useContext(TimePeriodContext);
  if (!context) {
    throw new Error("useTimePeriod must be used within a TimePeriodProvider");
  }
  return context;
};
