import React, { useState } from 'react';
import { Cat } from 'lucide-react';

interface CatEntityProps {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  onSplit: (x: number, y: number) => void;
  onRemove: () => void;
}

export default function CatEntity({ position, velocity, onSplit, onRemove }: CatEntityProps) {
  const [rotation, setRotation] = useState(Math.random() * 360);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  const handleClick = () => {
    onSplit(position.x, position.y);
    setScale(1.2);
    setTimeout(() => setScale(1), 200);
  };

  const fadeOut = () => {
    setOpacity(0);
    setTimeout(onRemove, 500);
  };

  // Remove cat after 10 seconds
  React.useEffect(() => {
    const timeout = setTimeout(fadeOut, 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className="absolute transition-all duration-300 ease-out cursor-pointer"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity
      }}
      onClick={handleClick}
    >
      <Cat 
        size={48} 
        className="text-pink-500 hover:text-pink-600 transition-colors animate-pulse"
        strokeWidth={1.5}
      />
    </div>
  );
}