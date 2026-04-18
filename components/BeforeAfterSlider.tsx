
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
        className={`absolute top-0 bottom-0 w-[1px] ${isStatic ? 'bg-[#00001C]' : 'bg-white'} flex items-center justify-center pointer-events-none`}
        style={{ left: `${position}%` }}
      >
        {!isStatic && (
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
            <span className="material-icons-outlined text-white text-lg">unfold_more</span>
          </div>
        )}
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-semibold tracking-wide pointer-events-none border border-white/10">
        Ennen
      </div>
      <div className="absolute top-6 right-6 bg-[#D4AF37]/90 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-semibold tracking-wide pointer-events-none border border-white/10">
        Jälkeen
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
