import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree7({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree7.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.8, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_637.geometry}
          material={materials.light_green}
        />
      </group>
      <group position={[0, 0.8, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_639.geometry}
          material={materials.brown}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree7.gltf");
