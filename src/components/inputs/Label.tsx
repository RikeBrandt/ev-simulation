import { FC, ReactNode } from "react";

export const Label: FC<{ children: ReactNode }> = ({ children }) => {
  return <label className="mt-1 text-xs text-zinc-300">{children}</label>;
};
