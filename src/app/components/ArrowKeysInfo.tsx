"use client";
import React, { useState, useEffect } from "react";
const ArrowKeysInfo = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setFadeOut(true); 
      }
    };
    if (typeof window !== undefined) {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div
      className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-white text-lg font-bold">Move the cube</p>
      <div className="flex flex-col items-center">
        <div>⬆️</div>
        <div className="flex justify-center">
          <div>⬅️</div>
          <div>⬇️</div>
          <div>➡️</div>
        </div>
      </div>
    </div>
  );
};

export default ArrowKeysInfo;
