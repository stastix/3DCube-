"use client";
import React from "react";
import ArrowKeysInfo from "./ArrowKeysInfo";
import CurrentShape from "./changeShape";
import useThreeScene from "../hooks/canvas-hook";
import ColorPicker from "./colorPicker";

const Canvas = () => {
  const { canvasRef, setCurrentShape, setColor } = useThreeScene();

  return (
    <div ref={canvasRef} className="w-full h-screen">
      <ArrowKeysInfo />
      <CurrentShape setCurrentShape={setCurrentShape} />
      <ColorPicker setColor={setColor} />
    </div>
  );
};

export default Canvas;
