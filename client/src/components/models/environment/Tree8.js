import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree8({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree8.gltf"
  );

  return (
    <group position={[0.1, -0.2, -0.15]} dispose={null}>
      <group position={[0, 0.97, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_595.geometry}
          material={materials.brown}
        />
      </group>
      <group position={[0, 0.97, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_597.geometry}
          material={materials.light_green}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree8.gltf");
