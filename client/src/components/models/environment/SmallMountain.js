import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function SmallMountain(props) {
  const { nodes, materials } = useGLTF(
    "/models/objects/forestSet/smallMountain.gltf"
  );

  return (
    <group dispose={null} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.5, 2.5]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              geometry={
                nodes.PP_Forest_Mountain_Moss_01001_PP_Standard_Material_0
                  .geometry
              }
              material={materials.PP_Standard_Material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/forestSet/smallMountain.gltf");
