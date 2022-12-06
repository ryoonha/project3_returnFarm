import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function TreeTrunk(props) {
  const { nodes, materials } = useGLTF("/models/treeTrunk/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Wood}
        />
        <mesh
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Wood_light}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/treeTrunk/scene.gltf");
