import React from "react";

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
      <div className="text-pink-600 font-bold text-2xl">分数: {score}</div>
    </div>
  );
}
