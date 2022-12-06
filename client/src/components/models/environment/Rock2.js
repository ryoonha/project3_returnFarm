import React from "react";
import { useGLTF } from "@react-three/drei";

export function Rock2({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/rock2.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.61, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_1093.geometry}
          material={materials.gray}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/rock2.gltf");
