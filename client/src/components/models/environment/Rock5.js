import React from "react";
import { useGLTF } from "@react-three/drei";

export function Rock5({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/rock5.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.24, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_42.geometry}
          material={materials["Material.030"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/rock5.gltf");
