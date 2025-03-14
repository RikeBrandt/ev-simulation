import { FC } from "react";
import { Label } from "./Label";

interface SelectInputProps {
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-2 py-2 border border-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Label>{label}</Label>
    </div>
  );
};

export default SelectInput;
