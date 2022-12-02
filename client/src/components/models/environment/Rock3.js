import React from "react";
import { useGLTF } from "@react-three/drei";

export function Rock3({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/rock3.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.51, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_1109.geometry}
          material={materials.gray}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/rock3.gltf");
