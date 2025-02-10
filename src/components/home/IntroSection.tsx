import { useState, useEffect } from "react";
import FormSubmitButton from "../common/skeleton/FormSubmitButton";

interface Tech {
  name: string;
  color: string;
}

interface BoxProps {
  position: {
    x: number;
    y: number;
    type: string;
    tech?: Tech;
  };
  delay?: number;
}

const technologies: Tech[] = [
  { name: "JS", color: "#F7DF1E" },
  { name: "TS", color: "#3178C6" },
  { name: "PY", color: "#306998" },
  { name: "GO", color: "#00ADD8" },
  { name: "JV", color: "#EA2D2E" },
  { name: "C", color: "#00ADD8" },
];

const Box: React.FC<BoxProps> = ({ position, delay = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity: mounted ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0.8})`,
      }}
    >
      <div
        className={`w-14 h-14 rounded-xl backdrop-blur-sm border border-gray-700/30 transition-all duration-300 group ${
          position.tech ? "bg-gray-800/60" : "bg-gray-800/40"
        } hover:border-orange-500/30 hover:bg-gray-800/80`}
      >
        {position.tech && (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-mono font-bold text-sm"
              style={{ color: position.tech.color }}
            >
              {position.tech.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const IntroSection: React.FC = () => {
  const boxPositions = [
    { x: 15, y: 20, type: "tech", tech: technologies[0] },
    { x: 75, y: 25, type: "tech", tech: technologies[1] },
    { x: 45, y: 30, type: "tech", tech: technologies[2] },
    { x: 85, y: 45, type: "tech", tech: technologies[3] },
    { x: 25, y: 65, type: "tech", tech: technologies[4] },
    { x: 25, y: 65, type: "tech", tech: technologies[5] },
    { x: 35, y: 15, type: "empty" },
    { x: 65, y: 20, type: "empty" },
    { x: 20, y: 40, type: "empty" },
    { x: 55, y: 45, type: "empty" },
    { x: 80, y: 35, type: "empty" },
    { x: 40, y: 60, type: "empty" },
    { x: 70, y: 65, type: "empty" },
    { x: 90, y: 55, type: "empty" }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-slate-900 to-gray-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(239, 68, 68, 0.15), transparent 60%)",
        }}
      />

      {boxPositions.map((position, index) => (
        <Box key={index} position={position} delay={index} />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-7xl font-bold mb-8 relative">
          <span className="absolute -inset-x-20 inset-y-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />
          <span className="relative">
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Elevate Your Skills,
            </span>
            <br />
            <span className="text-white">Conquer Every Challenge.</span>
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mb-12 text-xl leading-relaxed">
          Improve your development skills by training with your peers on
          CodeAurora that continuously challenge and push your coding practice.
        </p>
        <FormSubmitButton>Get started</FormSubmitButton>
      </div>
    </div>
  );
};

export default IntroSection;