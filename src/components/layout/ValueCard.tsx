import { FC, ReactNode } from "react";
import { Card } from "./Card";

type ValueCardProps = {
  result: string;
  label: string;
  color: string;
  icon: ReactNode;
};

export const ValueCard: FC<ValueCardProps> = ({
  result,
  label,
  color,
  icon,
}) => {
  return (
    <Card>
      <div className={`flex items-center gap-1 ${color} text-xl font-bold`}>
        {icon} {result}
      </div>
      <p className="text-xs text-zinc-300 pl-1">{label}</p>
    </Card>
  );
};
