import { Mesh } from "three";

export const enableShapeControls = (shape: Mesh) => {
  const speed = 0.1;
  const movement = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  let isMoving = false; 

 
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key in movement) {
      movement[event.key as keyof typeof movement] = true;
      if (!isMoving) {
        
        isMoving = true;
        updateShapePosition(); 
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key in movement) {
      movement[event.key as keyof typeof movement] = false;
      if (Object.values(movement).every((val) => !val)) {
        isMoving = false;
      }
    }
  };


  const updateShapePosition = () => {
    if (!isMoving) return; 

    if (movement.ArrowUp) shape.position.y += speed;
    if (movement.ArrowDown) shape.position.y -= speed;
    if (movement.ArrowLeft) shape.position.x -= speed;
    if (movement.ArrowRight) shape.position.x += speed;

    if (isMoving) requestAnimationFrame(updateShapePosition);
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
};
