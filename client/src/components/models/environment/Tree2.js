import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree2({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree2.gltf"
  );

  return (
    <group dispose={null}>
      <group scale={0.17}>
        <group position={[0, 7.92, -0.01]}>
          <mesh
            castShadow
            // receiveShadow
            geometry={nodes.Object_97.geometry}
            material={materials["green.001"]}
          />
          <mesh
            castShadow
            // receiveShadow
            geometry={nodes.Object_97_1.geometry}
            material={materials["brown.004"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree2.gltf");
