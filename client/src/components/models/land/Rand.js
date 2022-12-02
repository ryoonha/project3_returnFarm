import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Rand(props) {
  const { nodes, materials } = useGLTF("/models/objects/forestSet/rand.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              geometry={nodes.PP_Meadow_08001_PP_Standard_Material_0.geometry}
              material={materials.PP_Standard_Material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default Rand;
// export default memo(Rand);

useGLTF.preload("/models/objects/forestSet/rand.gltf");
