import {
  TimePeriod,
  timePeriods,
  useTimePeriod,
} from "./context/TimePeriodContext";

export const TimePeriodSelection = () => {
  const { timePeriod, setTimePeriod } = useTimePeriod();

  return (
    <div className="px-2 py-2  bg-zinc-900 rounded-full border border-zinc-700">
      <select
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
        className="text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
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
