import { FC } from "react";

interface TechIconProps {
  label: string;
  bgColor: string;
  textColor?: string;
}

const TechIcon: FC<TechIconProps> = ({
  label,
  bgColor,
  textColor = "text-white",
}) => (
  <div
    className={`${bgColor} w-14 h-14 rounded-xl flex items-center justify-center ${textColor} font-bold shadow-lg transform rotate-12`}
  >
    {label}
  </div>
);

export default TechIcon;
