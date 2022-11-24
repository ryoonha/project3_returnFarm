import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Grass2(props) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/grass2.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0.03]} scale={[4.6, 4.6, 9.14]}>
        <mesh
          castShadow
          geometry={nodes.Circle005_Grass_0.geometry}
          material={materials.Grass}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/grass2.gltf");
