import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export function Tree2({ size }) {
  const { nodes, materials } = useGLTF(
    "models/objects/environmentBox/tree2.gltf"
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
        <group {...props} dispose={null}>
          <group scale={0.17}>
            <group position={[0, 7.92, -0.01]}>
              <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Object_97.geometry}
                material={materials["green.001"]}
              />
              <mesh
                castShadow
                // receiveShadow
                geometry={nodes.Object_97_1.geometry}
                material={materials["brown.004"]}
              />
            </group>
          </group>
        </group>
      </mesh>
    );
  }

  return <Cube />;
}

useGLTF.preload("models/objects/environmentBox/tree2.gltf");
