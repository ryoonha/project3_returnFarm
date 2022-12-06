import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree5({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree5.gltf"
  );

  return (
    <group dispose={null}>
      <group position={[0, 0.74, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_628.geometry}
          material={materials.brown}
        />
        <mesh
          castShadow
          geometry={nodes.Object_629.geometry}
          material={materials.light_green}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree5.gltf");
