import React, { memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
let t = 0;
const Camera = () => {
  const { camera } = useThree();
  // console.log(camera);

  camera.position.set(0, 100, 0);

  // useFrame(() => {
  //   //console.log(camera.rotation);
  //   const { x, y, z } = camera.position;

  //   if (y > 100) {
  //     camera.position.set(0, y - 1, 0);
  //     // camera.rotation.set(-1.5, 0, (t += 0.01));
  //   }
  // });

  return <OrbitControls enablePan={false} />;
};

export default memo(Camera);
