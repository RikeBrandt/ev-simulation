import { FC } from "react";
import { TimePeriod } from "../context/TimePeriodContext";

type TimePeriodProps = {
  label: TimePeriod;
  active: TimePeriod;
  setActive: (value: TimePeriod) => void;
};

export const TimePeriodButton: FC<TimePeriodProps> = ({
  active,
  label,
  setActive,
}) => {
  return (
    <button
      className={active === label ? "button-active" : undefined}
      onClick={() => setActive(label)}
    >
      {label}
    </button>
  );
};
