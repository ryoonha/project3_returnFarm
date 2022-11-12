import React, { memo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSelector } from "react-redux";

function Tomato({ demo }) {
  const { nodes, materials } = useGLTF("/models/tomato/scene.gltf");
  const ref = useRef();

  const grow = useSelector((state) => state.test.check);

  useFrame(() => {
    const { x, y, z } = ref.current.scale;
    if (ref.current && grow) {
      //console.log(ref.current);
      ref.current.scale.set(x + 0.0001, y + 0.0001, z + 0.0001);
    } else if (ref.current && !grow) {
      ref.current.scale.set(x + 0.000001, y + 0.000001, z + 0.000001);
    }
  });

  return (
    <group dispose={null} ref={ref} scale={demo ? 0.05 : 1}>
      <group rotation={[demo ? 0 : -Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.lambert4SG}
        />
      </group>
    </group>
  );
}

export default memo(Tomato);
useGLTF.preload("/models/tomato/scene.gltf");
