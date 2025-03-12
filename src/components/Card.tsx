import { FC } from "react";

export const Card: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-zinc-900 p-8 rounded-sm">{children}</div>;
};
