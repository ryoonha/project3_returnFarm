import React from "react";
import { useGLTF } from "@react-three/drei";

export function Rock1({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/rock1.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.63, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_1127.geometry}
          material={materials.gray}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/rock1.gltf");
