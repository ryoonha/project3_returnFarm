import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Grass3(props) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/grass3.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0.83]} scale={[3.15, 3.15, 5.72]}>
            <mesh
              castShadow
              geometry={nodes.Circle015_Grass_0.geometry}
              material={materials.Grass}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/grass3.gltf");
