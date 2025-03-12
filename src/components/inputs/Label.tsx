import { FC } from "react";

export const Label: FC<{ label: string }> = ({ label }) => {
  return <label className="mt-1 text-xs text-zinc-300">{label}</label>;
};
