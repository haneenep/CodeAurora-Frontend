import { useState, useEffect, useRef } from "react";

interface Tech {
  name: string;
  color: string;
}

interface Position {
  x: number;
  y: number;
}

interface BoxProps {
  position: Position;
  tech: Tech | null | undefined;
  delay?: number;
  mousePosition: Position;
}

const technologies: Tech[] = [
  { name: "JS", color: "#F7DF1E" },
  { name: "TS", color: "#3178C6" },
  { name: "PY", color: "#306998" },
  { name: "GO", color: "#00ADD8" },
  { name: "JV", color: "#EA2D2E" },
  { name: "C", color: "#00ADD8" },
];

const calculateMovement = (
  mousePosition: Position,
  basePosition: Position,
  maxMove: number,
  influenceRadius: number
): { moveX: number; moveY: number } => {
  const dx = mousePosition.x - basePosition.x;
  const dy = mousePosition.y - basePosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance >= influenceRadius) return { moveX: 0, moveY: 0 };

  const influence = (1 - distance / influenceRadius) * maxMove;
  return {
    moveX: (dx / distance) * influence,
    moveY: (dy / distance) * influence,
  };
};

const Box: React.FC<BoxProps> = ({ position, tech, delay = 0, mousePosition }) => {
  const [mounted, setMounted] = useState(false);
  const basePosition = useRef(position);
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const { moveX, moveY } = calculateMovement(
      mousePosition,
      basePosition.current,
      3,
      20
    );
    setCurrentPosition({
      x: basePosition.current.x + moveX,
      y: basePosition.current.y + moveY,
    });
  }, [mousePosition]);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        opacity: mounted ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0.8})`,
      }}
    >
      <div
        className={`w-14 h-14 rounded-xl backdrop-blur-sm border border-gray-700/30 transition-all duration-300 group ${
          tech ? "bg-gray-800/60" : "bg-gray-800/40"
        } hover:border-orange-500/30 hover:bg-gray-800/80`}
      >
        {tech ? (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-mono font-bold text-sm"
              style={{ color: tech.color }}
            >
              {tech.name}
            </span>
          </div>
        ) : (
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(45deg, rgba(251, 146, 60, 0.05), rgba(239, 68, 68, 0.05))",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });

  const boxPositions = [
    // Tech icons
    { x: 15, y: 20, type: "tech", tech: technologies[0] },
    { x: 75, y: 25, type: "tech", tech: technologies[1] },
    { x: 45, y: 30, type: "tech", tech: technologies[2] },
    { x: 85, y: 45, type: "tech", tech: technologies[3] },
    { x: 25, y: 65, type: "tech", tech: technologies[4] },
    { x: 25, y: 65, type: "tech", tech: technologies[5] },
    // Empty boxes
    { x: 35, y: 15, type: "empty" },
    { x: 65, y: 20, type: "empty" },
    { x: 20, y: 40, type: "empty" },
    { x: 55, y: 45, type: "empty" },
    { x: 55, y: 45, type: "empty" },
    { x: 80, y: 35, type: "empty" },
    { x: 80, y: 35, type: "empty" },
    { x: 40, y: 60, type: "empty" },
    { x: 70, y: 65, type: "empty" },
    { x: 90, y: 55, type: "empty" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-gray-50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(239, 68, 68, 0.15), transparent 60%)",
        }}
      />

      {boxPositions.map((position, index) => (
        <Box
          key={index}
          position={position}
          tech={position.type === "tech" ? position.tech : null}
          delay={index}
          mousePosition={mousePosition}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-7xl font-bold mb-8 relative">
          <span className="absolute -inset-x-20 inset-y-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />
          <span className="relative">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Achieve mastery
            </span>
            <br />
            <span className="text-white">through challenge</span>
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mb-12 text-xl leading-relaxed">
          Improve your development skills by training with your peers on code
          kata that continuously challenge and push your coding practice.
        </p>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300">
          Get started
        </button>
      </div>
    </div>
  );
};

export default IntroSection;