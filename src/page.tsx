"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Canvas = dynamic(() => import("./components/Canvas"), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <Canvas /> : null;
}
