import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Flowre1(props) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/flowre1.gltf"
  );
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.1, 0]} scale={1}>
        <mesh
          castShadow
          geometry={nodes.Circle006_Circle007_Material001_0.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/flowre1.gltf");
