import React from "react";
import { useGLTF } from "@react-three/drei";

export function Flowre2(props) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/flowre2.gltf"
  );

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.1, 0]} scale={1}>
        <mesh
          castShadow
          geometry={nodes.Circle001_Material001_0.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/objects/environmentBox/flowre2.gltf");
