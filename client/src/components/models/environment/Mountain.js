import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Mountain(props) {
  const { nodes, materials } = useGLTF(
    "/models/objects/mountain/mountain.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0.51, -0.76, 0.05]}>
          <mesh geometry={nodes.Plane_0.geometry} material={materials.Green} />
          <mesh geometry={nodes.Plane_1.geometry} material={materials.Brown} />
          <mesh geometry={nodes.Plane_2.geometry} material={materials.Snow} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/mountain/mountain.gltf");
