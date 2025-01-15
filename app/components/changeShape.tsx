"use client";
import React, { useState } from "react";
import { FaCube, FaCircle, FaRegCircle } from "react-icons/fa";

export type Shape = "cube" | "sphere" | "cylinder";

const CurrentShape = ({
  setCurrentShape,
}: {
  setCurrentShape: (shape: Shape) => void;
}) => {
  const [selectedShape, setSelectedShape] = useState<Shape>("cube");

  const handleButtonClick = (shape: Shape) => {
    setSelectedShape(shape);
    setCurrentShape(shape);
  };

  return (
    <div className="absolute top-10 left-10 flex-1 space-y-2">
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-400 transition-all duration-300 ${
          selectedShape === "cube" ? "bg-gray-500" : ""
        }`}
        onClick={() => handleButtonClick("cube")}
      >
        <FaCube className="text-xl text-white" />
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-400 transition-all duration-300 ${
          selectedShape === "sphere" ? "bg-gray-500" : ""
        }`}
        onClick={() => handleButtonClick("sphere")}
      >
        <FaCircle className="text-xl text-white" />
      </button>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-400 transition-all duration-300 ${
          selectedShape === "cylinder" ? "bg-gray-500" : ""
        }`}
        onClick={() => handleButtonClick("cylinder")}
      >
        <FaRegCircle className="text-xl text-white" />
      </button>
    </div>
  );
};

export default CurrentShape;
