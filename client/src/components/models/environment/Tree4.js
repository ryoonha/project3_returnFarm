import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree4({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree4.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.9, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_180.geometry}
          material={materials["brown.004"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_181.geometry}
          material={materials["green.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree4.gltf");
