import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Grass1(props) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/grass1.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 1.29]} scale={[3.97, 3.97, 7.21]}>
            <mesh
              castShadow
              geometry={nodes.Circle012_Grass_0.geometry}
              material={materials.Grass}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/grass1.gltf");
