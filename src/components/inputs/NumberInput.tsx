import { FC } from "react";
import { Label } from "./Label";

export const NumberInput: FC<{
  value: number;
  setValue: (v: number) => void;
  label: string;
}> = ({ value, setValue, label }) => {
  return (
    <div className="flex flex-col align-start w-[50%] ">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="px-2 py-2 border border-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
      />
      <Label>{label}</Label>
    </div>
  );
};
