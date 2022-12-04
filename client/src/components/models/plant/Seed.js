import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Seed(props) {
  const { nodes, materials } = useGLTF("/models/seed/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials["09___Default"]}
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials["10___Default"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/seed/scene.gltf");
