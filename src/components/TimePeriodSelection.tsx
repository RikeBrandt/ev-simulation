import { timePeriods, useTimePeriod } from "./context/TimePeriodContext";
import { TimePeriodButton } from "./layout/TimePeriodButton";

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
