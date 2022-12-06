import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Cloud(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/objects/cloud/cloud.gltf"
  );
  const { actions } = useAnimations(animations, group);
  // useEffect(() => {
  //   actions.Main.play();
  // }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group
            name="52bf8a54c556470f89f4be0c8d967b01fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Cluds">
                  <group name="Metaball_7" rotation={[1.54, 0, -1.42]}>
                    <mesh
                      castShadow
                      name="Metaball_7_Cloud_0"
                      geometry={nodes.Metaball_7_Cloud_0.geometry}
                      material={materials.Cloud}
                    />
                  </group>
                </group>
                <group name="Random" />
                <group name="Subdivision_Surface" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/cloud/cloud.gltf");
