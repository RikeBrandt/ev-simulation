import {
  TimePeriod,
  timePeriods,
  useTimePeriod,
} from "./context/TimePeriodContext";

export const TimePeriodSelection = () => {
  const { timePeriod, setTimePeriod } = useTimePeriod();

  return (
    <div className="px-2 py-2  text-black font-medium rounded-full  button-gradient">
      <select
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
        className="text-sm cursor-pointer focus:outline-none"
      >
        {timePeriods.map((option) => (
          <option key={option} value={option} className="text-xs">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
