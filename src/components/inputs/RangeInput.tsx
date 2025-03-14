import { FC, useState } from "react";
import { Label } from "./Label";

interface RangeInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min: number;
  max: number;
}

const RangeInput: FC<RangeInputProps> = ({
  value,
  onChange,
  label,
  min,
  max,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const mid = max / 2;

  return (
    <div className="flex flex-col">
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="w-full appearance-none bg-transparent cursor-pointer"
        style={{
          WebkitAppearance: "none",
          background: `linear-gradient(to right, var(--color-cyan-400) 0%, var(--color-cyan-400) ${
            ((value - 10) / (max - 10)) * 100
          }%, var(--color-cyan-800) ${
            ((value - 10) / (max - 10)) * 100
          }%, var(--color-cyan-800) 100%)`,
        }}
      />

      {tooltipVisible && (
        <div
          className="absolute -top-8 bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
          style={{
            left: `${((value - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {value}%
        </div>
      )}

      <div className="flex justify-between mt-2 text-xs text-zinc-300">
        <span>{min}%</span>
        <span className="font-semibold">{mid}%</span>
        <span>{max}%</span>
      </div>

      <Label>{label}</Label>
    </div>
  );
};

export default RangeInput;
