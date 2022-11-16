import React, { memo } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Camera = () => {
  const { camera } = useThree();

  camera.position.set(0, 100, 0);
  // autoRotate
  return <OrbitControls enablePan={false} />;
};

export default memo(Camera);
