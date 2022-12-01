import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export function SmallMountain2(props) {
  const { nodes, materials } = useGLTF(
    "/models/objects/forestSet/smallMountain2.gltf"
  );

  const [cylinderRef, cylinderApi] = useCylinder(() => ({
    type: "Static",
    args: [20, 20, 50],
    ...props,
  }));

  return (
    <group dispose={null} ref={cylinderRef} scale={props.scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              geometry={
                nodes.PP_Forest_Mountain_Moss_02001_PP_Standard_Material_0
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

useGLTF.preload("/models/objects/forestSet/smallMountain2.gltf");
