import React from "react";
import { useGLTF } from "@react-three/drei";

export function Rock4({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/rock4.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.22, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_46.geometry}
          material={materials["Material.037"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/rock4.gltf");
