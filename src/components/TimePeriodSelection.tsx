import { FC } from "react";
import { TimePeriod, timePeriods, useTimePeriod } from "./TimePeriodContext";

export const TimePeriodSelection = () => {
  const { timePeriod, setTimePeriod } = useTimePeriod();

  return (
    <div className="flex gap-2">
      {timePeriods.map((label) => (
        <TimePeriodButton
          label={label}
          active={timePeriod}
          setActive={setTimePeriod}
        />
      ))}
    </div>
  );
};

const TimePeriodButton: FC<{
  label: TimePeriod;
  active: TimePeriod;
  setActive: (value: TimePeriod) => void;
}> = ({ active, label, setActive }) => {
  return (
    <button
      className={active === label ? "button-active" : undefined}
      onClick={() => setActive(label)}
    >
      {label}
    </button>
  );
};
