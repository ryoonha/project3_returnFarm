import React, { memo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Camera = ({ ttt, canvas }) => {
  const { camera } = useThree();

  camera.position.set(0, 100, 0);
  // autoRotate
  return <OrbitControls enablePan={false} />;
};

export default memo(Camera);
