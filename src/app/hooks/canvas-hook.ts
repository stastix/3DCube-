import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { enableShapeControls } from "../init/CubeControls";
import { Shape } from "../components/changeShape";

const useThreeScene = () => {
  const [currentShape, setCurrentShape] = useState<Shape>("cube");
  const [color, setColor] = useState<string>("#00ff00");
  const canvasRef = useRef<HTMLDivElement>(null);
  const currentShapeObject = useRef<THREE.Mesh | null>(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer.current = new THREE.WebGLRenderer();
    renderer.current.setSize(window.innerWidth, window.innerHeight);

    canvasRef.current.appendChild(renderer.current.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.current.add(ambientLight, directionalLight);

    camera.current.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      if (currentShapeObject.current) {
        currentShapeObject.current.rotation.x += 0.01;
        currentShapeObject.current.rotation.y += 0.01;
      }
      renderer.current?.render(scene.current, camera.current!);
    };
    animate();
    const currentCanvasRef = canvasRef.current;
    return () => {
      if (renderer.current) {
        renderer.current?.dispose();
        currentCanvasRef?.removeChild(renderer.current.domElement);
      }
    };
  }, [isMounted]);

  const createNewShape = useCallback(
    (shape: Shape) => {
      let geometry: THREE.BufferGeometry | null = null;

      switch (shape) {
        case "cube":
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case "cylinder":
          geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
          break;
        case "sphere":
          geometry = new THREE.SphereGeometry(1, 32, 32);
          break;
        default:
          break;
      }

      if (geometry) {
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        geometry.computeBoundingBox();
        if (geometry.boundingBox) {
          const center = new THREE.Vector3();
          geometry.boundingBox.getCenter(center);
          geometry.translate(-center.x, -center.y, -center.z);
        }
        return mesh;
      }
      return null;
    },
    [color]
  );

  useEffect(() => {
    if (currentShapeObject.current) {
      scene.current.remove(currentShapeObject.current);
      currentShapeObject.current.geometry.dispose();
      (currentShapeObject.current.material as THREE.Material).dispose();
    }

    const newShape = createNewShape(currentShape);
    if (newShape) {
      currentShapeObject.current = newShape;
      scene.current.add(newShape);
      enableShapeControls(newShape);
    }
  }, [currentShape, createNewShape]);

  useEffect(() => {
    if (currentShapeObject.current) {
      const material = currentShapeObject.current
        .material as THREE.MeshStandardMaterial;
      material.color.set(color);
    }
  }, [color]);

  return { canvasRef, setCurrentShape, setColor };
};

export default useThreeScene;
