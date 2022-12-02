import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree3({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree3.gltf"
  );

  return (
    <group position={[0.32, -0.05, -0.1]} dispose={null}>
      <group position={[0, 0.79, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_133.geometry}
          material={materials["brown.004"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_134.geometry}
          material={materials["green.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree3.gltf");
