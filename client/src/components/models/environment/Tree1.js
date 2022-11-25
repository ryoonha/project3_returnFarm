import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export function Tree1({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree1.gltf"
  );

  function Cube(props) {
    const [ref] = useBox(() => ({
      type: "Static",
      mass: 1,
      position: [0, -0.1, 0],
      aegs: size,
      ...props,
    }));
    return (
      <mesh ref={ref}>
        {/* <boxGeometry args={size} />
        <meshNormalMaterial /> */}
        <group {...props} dispose={null} scale={0.25}>
          <group rotation={[-Math.PI / 2, 0, 0]} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_198.geometry}
            material={materials["brown.004"]}
            position={[-0.13, 4.46, -0.54]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_199.geometry}
            material={materials["green.001"]}
            position={[-0.13, 4.46, -0.54]}
          />
        </group>
      </mesh>
    );
  }

  return <Cube />;
}

useGLTF.preload("models/objects/environmentBox/tree1.gltf");
