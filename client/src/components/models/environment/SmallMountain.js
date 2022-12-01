import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export function SmallMountain(props) {
  const { nodes, materials } = useGLTF(
    "/models/objects/forestSet/smallMountain.gltf"
  );

  const [cylinderRef, cylinderApi] = useCylinder(() => ({
    type: "Static",
    args: [25, 30, 50],
    ...props,
  }));
  return (
    <group ref={cylinderRef} dispose={null} scale={props.scale}>
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
