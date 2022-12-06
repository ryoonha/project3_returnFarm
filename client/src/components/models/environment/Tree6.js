import React from "react";
import { useGLTF } from "@react-three/drei";

export function Tree6({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree6.gltf"
  );

  return (
    <group position={[0.1, 0, 0]} dispose={null}>
      <group position={[0, 0.88, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_537.geometry}
          material={materials.brown}
        />
      </group>
      <group position={[0, 0.88, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_539.geometry}
          material={materials.light_green}
          position={[3.68, 2.54, -2.03]}
        />
      </group>
      <group position={[0, 0.88, 0]} scale={0.17}>
        <mesh
          castShadow
          geometry={nodes.Object_547.geometry}
          material={materials.light_green}
          position={[-1.76, 3.43, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/tree6.gltf");
