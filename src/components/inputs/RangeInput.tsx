import { FC, useState } from "react";
import { Label } from "./Label";

interface RangeInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

const RangeInput: FC<RangeInputProps> = ({ value, onChange, label }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <input
        type="range"
        min={20}
        max={200}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        className="w-full appearance-none bg-transparent cursor-pointer"
        style={{
          WebkitAppearance: "none",
          background: `linear-gradient(to right, var(--color-cyan-400) 0%, var(--color-cyan-400) ${
            ((value - 10) / (200 - 10)) * 100
          }%, var(--color-cyan-800) ${
            ((value - 10) / (200 - 10)) * 100
          }%, var(--color-cyan-800) 100%)`,
        }}
      />

      {tooltipVisible && (
        <div
          className="absolute -top-8 bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
          style={{
            left: `${((value - 20) / (200 - 20)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {value}%
        </div>
      )}

      <div className="flex justify-between mt-2 text-xs text-zinc-300">
        <span>20%</span>
        <span className="font-semibold">100%</span>
        <span>200%</span>
      </div>

      <Label label={label} />
    </div>
  );
};

export default RangeInput;
