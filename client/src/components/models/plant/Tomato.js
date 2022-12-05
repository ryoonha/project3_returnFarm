import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Tomato() {
  const { nodes, materials } = useGLTF("/models/tomato/scene.gltf");
  const ref = useRef();

  return (
    <group dispose={null} ref={ref} scale={0.05}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.lambert4SG}
        />
      </group>
    </group>
  );
}

export default memo(Tomato);
useGLTF.preload("/models/tomato/scene.gltf");
