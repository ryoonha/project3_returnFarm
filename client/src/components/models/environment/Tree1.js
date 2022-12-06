import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree1({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree1.gltf"
  );

  return (
    <group dispose={null} scale={0.25}>
      <group rotation={[-Math.PI / 2, 0, 0]} />
      <mesh
        castShadow
        geometry={nodes.Object_198.geometry}
        material={materials["brown.004"]}
        position={[-0.13, 4.46, -0.54]}
      />
      <mesh
        castShadow
        geometry={nodes.Object_199.geometry}
        material={materials["green.001"]}
        position={[-0.13, 4.46, -0.54]}
      />
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree1.gltf");
