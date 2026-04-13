
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  before: string;
  after: string;
  isStatic?: boolean;
}

const BeforeAfterSlider: React.FC<Props> = ({ before, after, isStatic = false }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isStatic || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setPosition(percentage);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-xl overflow-hidden select-none ${isStatic ? '' : 'cursor-ew-resize'}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0">
        <img src={after} alt="Epoksilattia asennuksen jälkeen" className="w-full h-full object-cover object-[center_80%] img-brighten" referrerPolicy="no-referrer" />
      </div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before} alt="Betonilattia ennen timanttihiontaa ja pinnoitusta" className="w-full h-full object-cover object-[center_80%] img-brighten" referrerPolicy="no-referrer" />
      </div>

      {/* Slider Line & Handle */}
      <div
        className={`absolute top-0 bottom-0 w-1 ${isStatic ? 'bg-blue-900' : 'bg-white'} shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none`}
        style={{ left: `${position}%` }}
      >
        {!isStatic && (
          <div className="w-10 h-10 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-xl">
            <span className="material-icons-outlined text-white text-lg">unfold_more</span>
          </div>
        )}
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none border border-white/20">
        Ennen
      </div>
      <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none border border-white/20">
        Jälkeen
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
