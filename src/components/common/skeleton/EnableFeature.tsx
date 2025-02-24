import React from "react";

interface EnableFeatureProps {
  feature: string;
  color: "blue" | "red" | "green" | "purple";
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const EnableFeature: React.FC<EnableFeatureProps> = ({
  feature = "Enable Feature",
  color = "blue",
  checked = false,
  onChange,
}) => {
  
  const colorClasses = {
    blue: {
      border: "peer-checked:border-blue-500",
      background: "peer-checked:bg-blue-500",
      hoverText: "group-hover:text-blue-500",
    },
    red: {
      border: "peer-checked:border-red-500",
      background: "peer-checked:bg-red-500",
      hoverText: "group-hover:text-red-500",
    },
    green: {
      border: "peer-checked:border-green-500",
      background: "peer-checked:bg-green-500",
      hoverText: "group-hover:text-green-500",
    },
    purple: {
      border: "peer-checked:border-purple-500",
      background: "peer-checked:bg-purple-500",
      hoverText: "group-hover:text-purple-500",
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <label className="group flex items-center cursor-pointer">

        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
        />

        <span
          className={`relative w-8 h-8 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 ${colorClasses[color].border} ${colorClasses[color].background} peer-hover:scale-105`}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500" />

          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className="hidden w-5 h-5 text-white peer-checked:block transition-transform duration-500 transform scale-50 peer-checked:scale-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              fillRule="evenodd"
            />
          </svg>
        </span>

        <span
          className={`ml-3 text-gray-700 ${colorClasses[color].hoverText} font-medium transition-colors duration-300`}
        >
          {feature}
        </span>
      </label>
    </div>
  );
};