import { FC } from "react";

export const Card: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-zinc-900 px-2 md:px-4 py-2 rounded-sm border border-zinc-700">
      {children}
    </div>
  );
};
