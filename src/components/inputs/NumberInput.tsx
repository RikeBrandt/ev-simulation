import { FC } from "react";
import { Label } from "./Label";

export const NumberInput: FC<{
  value: number;
  setValue: any;
  label: string;
}> = ({ value, setValue, label }) => {
  return (
    <div className="flex flex-col align-start">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full px-2 py-2 border border-zinc-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-white"
      />
      <Label label={label} />
    </div>
  );
};
