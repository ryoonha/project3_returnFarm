import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PineTree(props) {
  const { nodes, materials } = useGLTF("/models/objects/pine_tree/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0.66, 0]}>
            <mesh
              castShadow
              geometry={
                nodes.group3_pasted__group1_pasted__pasted__pCone1_lambert1_0
                  .geometry
              }
              material={materials.lambert1}
            />
          </group>
          {/* <group position={[-0.7, 0.06, 0.11]} scale={6.76}>
            <mesh
              geometry={nodes.pPlane1_lambert2_0.geometry}
              material={materials.lambert2}
            />
          </group> */}
          {/* <group position={[-0.84, 0.37, 0.18]} scale={0.7}>
            <mesh
              geometry={nodes.pCube3_lambert3_0.geometry}
              material={materials.lambert3}
            />
          </group> */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/pine_tree/scene.gltf");
