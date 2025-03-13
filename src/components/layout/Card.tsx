import { FC } from "react";

export const Card: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-zinc-900 px-4 py-2 rounded-sm">{children}</div>;
};
