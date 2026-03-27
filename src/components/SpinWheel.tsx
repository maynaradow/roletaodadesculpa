import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpinWheelProps {
  onSpinComplete: (index: number) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
}

const SEGMENTS = [
  { label: "R$ 1.000", icon: "💰", color: "hsl(330, 100%, 60%)" },
  { label: "Redução de testa", icon: "💇", color: "hsl(45, 100%, 55%)" },
  { label: "R$ 10", icon: "🪙", color: "hsl(180, 100%, 50%)" },
  { label: "Livro de programação", icon: "📖", color: "hsl(120, 80%, 50%)" },
  { label: "Tatuagem", icon: "🎨", color: "hsl(25, 100%, 55%)" },
  { label: "Um Abraço", icon: "🤗", color: "hsl(280, 100%, 65%)" },
];

export const SpinWheel = ({ onSpinComplete, isSpinning, setIsSpinning }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const wheelRef = useRef<SVGGElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    const spins = 8 + Math.random() * 4;
    const randomSegment = 3;
    const segAngle = 360 / SEGMENTS.length;
    const pointerAngle = 270;
    const segmentCenterAngle = (randomSegment * segAngle) + (segAngle / 2) - 90;
    const targetRotation = (pointerAngle - segmentCenterAngle + 360) % 360;
    
    setRotation(prev => {
      const currentMod = ((prev % 360) + 360) % 360;
      const correction = (targetRotation - currentMod + 360) % 360;
      return prev + spins * 360 + correction;
    });
    
    // 5 seconds spin duration
    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(randomSegment);
    }, 5000);
  };

  const segmentAngle = 360 / SEGMENTS.length;
  const radius = 150;
  const centerX = 175;
  const centerY = 175;

  const createSegmentPath = (index: number) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = ((index * segmentAngle) + (segmentAngle / 2) - 90) * (Math.PI / 180);
    const textRadius = radius * 0.65;
    return {
      x: centerX + textRadius * Math.cos(angle),
      y: centerY + textRadius * Math.sin(angle),
      rotation: (index * segmentAngle) + (segmentAngle / 2),
    };
  };

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-xl animate-pulse-glow" />
      
      {/* Decorative lights around wheel - perfect circle */}
      <div className="absolute" style={{ width: 350, height: 350 }}>
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 - 90) * (Math.PI / 180);
          const lightRadius = 195;
          const x = 175 + lightRadius * Math.cos(angle);
          const y = 175 + lightRadius * Math.sin(angle);
          return (
            <div
              key={i}
              className={cn(
                "absolute w-3 h-3 rounded-full bg-secondary",
                i % 2 === 0 ? "animate-lights" : "animate-lights [animation-delay:0.25s]"
              )}
              style={{
                left: x - 6,
                top: y - 6,
                boxShadow: "0 0 10px hsl(var(--secondary))",
              }}
            />
          );
        })}
      </div>

      {/* Main wheel container */}
      <div className="relative w-[350px] h-[350px]">
        {/* Gold outer ring */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(45, 100%, 70%), hsl(45, 100%, 50%), hsl(45, 100%, 35%))",
            padding: "8px",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <svg 
              width="334" 
              height="334" 
              viewBox="0 0 350 350"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
              }}
              
            >
              <g ref={wheelRef}>
                {SEGMENTS.map((segment, index) => {
                  const textPos = getTextPosition(index);
                  return (
                    <g key={index}>
                      <path
                        d={createSegmentPath(index)}
                        fill={segment.color}
                        stroke="hsl(45, 100%, 50%)"
                        strokeWidth="2"
                        className={cn(
                          "transition-all duration-200 cursor-pointer",
                          hoveredSegment === index && !isSpinning && "brightness-110"
                        )}
                        onMouseEnter={() => !isSpinning && setHoveredSegment(index)}
                        onMouseLeave={() => setHoveredSegment(null)}
                        style={{
                          filter: hoveredSegment === index && !isSpinning 
                            ? "drop-shadow(0 0 10px rgba(255,255,255,0.5))" 
                            : undefined
                        }}
                      />
                      <text
                        x={textPos.x}
                        y={textPos.y - 8}
                        fill="white"
                        fontSize="20"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                      >
                        {segment.icon}
                      </text>
                      <text
                        x={textPos.x}
                        y={textPos.y + 12}
                        fill="white"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                        style={{ 
                          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                          fontFamily: "'Nunito', sans-serif"
                        }}
                      >
                        {segment.label}
                      </text>
                    </g>
                  );
                })}
                {/* Center circle */}
                <circle cx={centerX} cy={centerY} r="35" fill="url(#goldGradient)" stroke="hsl(45, 100%, 35%)" strokeWidth="3" />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(45, 100%, 70%)" />
                    <stop offset="50%" stopColor="hsl(45, 100%, 50%)" />
                    <stop offset="100%" stopColor="hsl(45, 100%, 35%)" />
                  </linearGradient>
                </defs>
              </g>
            </svg>
          </div>
        </div>

        {/* Center spin button - fixed position */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-16 h-16 rounded-full",
            "bg-gradient-to-br from-gold-light via-gold to-gold-dark",
            "font-display text-lg text-secondary-foreground",
            "shadow-lg",
            !isSpinning && "hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-200",
            "disabled:opacity-70 disabled:cursor-not-allowed"
          )}
          style={{
            boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.3)",
          }}
        >
          {isSpinning ? "..." : "GIRA!"}
        </button>
      </div>

      {/* Pointer/Arrow at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10"
        style={{
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderTop: "40px solid hsl(45, 100%, 50%)",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
        }}
      />
    </div>
  );
};
