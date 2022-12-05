import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Shovel(props) {
  const { nodes, materials } = useGLTF("/models/shovel/scene.gltf");
  return (
    <group {...props} dispose={null} scale={0.5}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.04}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-0.27, -6.8, 38.88]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.69}
          >
            <mesh
              castShadow
              geometry={nodes["Box001_Material_#25_0"].geometry}
              material={materials.Material_25}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/shovel/scene.gltf");
