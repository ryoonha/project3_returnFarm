import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export function Tree4({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree4.gltf"
  );

  function Cube(props) {
    const [ref] = useBox(() => ({
      type: "Static",
      mass: 1,
      position: [0, 0, 0],
      aegs: size,
      ...props,
    }));
    return (
      <mesh ref={ref}>
        {/* <boxGeometry args={size} />
        <meshNormalMaterial /> */}
        <group {...props} dispose={null}>
          <group position={[0, 0.9, 0]} scale={0.17}>
            <mesh
              castShadow
              geometry={nodes.Object_180.geometry}
              material={materials["brown.004"]}
            />
            <mesh
              castShadow
              geometry={nodes.Object_181.geometry}
              material={materials["green.001"]}
            />
          </group>
        </group>
      </mesh>
    );
  }

  return <Cube />;
}

useGLTF.preload("models/objects/environmentBox/tree4.gltf");
