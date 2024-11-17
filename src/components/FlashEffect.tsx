import React, { useEffect, useState } from 'react';

interface FlashEffectProps {
  x: number;
  y: number;
  onComplete: () => void;
}

export default function FlashEffect({ x, y, onComplete }: FlashEffectProps) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 300);
    }, 200);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div 
      className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
        boxShadow: '0 0 40px 20px rgba(255,223,242,0.6)'
      }}
    />
  );
}