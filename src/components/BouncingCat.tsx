import React, { useState, useEffect, useCallback } from "react";
import CatEntity from "./CatEntity";
import FlashEffect from "./FlashEffect";

interface Cat {
  id: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface Flash {
  id: number;
  x: number;
  y: number;
}

interface Props {
  onSplit: () => void;
}

export default function BouncingCat({ onSplit }: Props) {
  const [cats, setCats] = useState<Cat[]>([
    {
      id: 0,
      position: { x: 50, y: 50 },
      velocity: { x: 2, y: 2 },
    },
  ]);
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const [nextId, setNextId] = useState(1);

  const updateCatPosition = useCallback((cat: Cat) => {
    let newX = cat.position.x + cat.velocity.x;
    let newY = cat.position.y + cat.velocity.y;
    let newVelX = cat.velocity.x;
    let newVelY = cat.velocity.y;

    // Add slight randomness
    newVelX += (Math.random() - 0.5) * 0.2;
    newVelY += (Math.random() - 0.5) * 0.2;

    // Keep velocity within bounds
    newVelX = Math.max(-3, Math.min(3, newVelX));
    newVelY = Math.max(-3, Math.min(3, newVelY));

    // Bounce off walls
    if (newX <= 0 || newX >= 90) newVelX = -newVelX * 0.8;
    if (newY <= 0 || newY >= 90) newVelY = -newVelY * 0.8;

    return {
      ...cat,
      position: {
        x: Math.max(0, Math.min(90, newX)),
        y: Math.max(0, Math.min(90, newY)),
      },
      velocity: { x: newVelX, y: newVelY },
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCats((prevCats) => prevCats.map(updateCatPosition));
    }, 100);

    return () => clearInterval(interval);
  }, [updateCatPosition]);

  const handleSplit = (x: number, y: number) => {
    const numNewCats = 2;
    const newCats = Array.from({ length: numNewCats }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 2;
      return {
        id: nextId + Math.random(),
        position: { x, y },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
      };
    });

    setNextId((prev) => prev + numNewCats);
    setCats((prev) => [...prev, ...newCats]);
    setFlashes((prev) => [...prev, { id: nextId, x, y }]);
    onSplit();
  };

  const removeFlash = (flashId: number) => {
    setFlashes((prev) => prev.filter((f) => f.id !== flashId));
  };

  const removeCat = (catId: number) => {
    setCats((prev) => prev.filter((cat) => cat.id !== catId));
  };

  return (
    <>
      {cats.map((cat) => (
        <CatEntity
          key={cat.id}
          position={cat.position}
          velocity={cat.velocity}
          onSplit={handleSplit}
          onRemove={() => removeCat(cat.id)}
        />
      ))}
      {flashes.map((flash) => (
        <FlashEffect
          key={flash.id}
          x={flash.x}
          y={flash.y}
          onComplete={() => removeFlash(flash.id)}
        />
      ))}
    </>
  );
}
