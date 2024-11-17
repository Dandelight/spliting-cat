import React, { useState } from "react";
import BouncingCat from "./components/BouncingCat";
import ScoreDisplay from "./components/ScoreDisplay";

function App() {
  const [score, setScore] = useState(0);

  const handleSplit = () => {
    setScore((prev) => prev + 10);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-500 select-none pointer-events-none">
          <p className="text-xl font-medium mb-2">点击小猫让它分裂！</p>
          <p className="text-sm">看它们在屏幕上自由地蹦跶~</p>
        </div>
      </div>
      <ScoreDisplay score={score} />
      <BouncingCat onSplit={handleSplit} />
    </div>
  );
}

export default App;
