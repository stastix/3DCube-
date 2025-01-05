"use client";
import React, { useState } from "react";

const ColorPicker = ({ setColor }: { setColor: (color: string) => void }) => {
  const [currentColor, setCurrentColor] = useState("#00ff00");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      setColor(newColor);
    }, 300);
    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <input
        id="color-picker"
        type="color"
        value={currentColor}
        onChange={handleColorChange}
        className="absolute w-0 h-0 opacity-0"
        style={{
          top: 0,
          left: 0,
          pointerEvents: "auto",
        }}
      />

      <div
        onClick={() => document.getElementById("color-picker")?.click()}
        className="w-12 h-12 rounded-full cursor-pointer"
        style={{
          backgroundColor: currentColor,
        }}
      ></div>
    </div>
  );
};

export default ColorPicker;
