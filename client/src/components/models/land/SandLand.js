import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SandLand(props) {
  const { nodes, materials } = useGLTF("/models/objects/sandLand/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[4.08, 1.01, 5.9]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[0, 0, 1]}>
          <mesh geometry={nodes.Soil_0.geometry} material={materials.Soil} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/sandLand/scene.gltf");
