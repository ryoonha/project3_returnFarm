import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Well(props) {
  const { nodes, materials } = useGLTF("/models/objects/well/scene.gltf");
  //const [pos, setPos] = useState([0, -5000000, 0]);

  return (
    <group dispose={null} scale={0.2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[8.07, 10.94, 0]}>
            <mesh
              geometry={nodes.Object_4.geometry}
              material={materials.wood1}
            />
            <mesh
              geometry={nodes.Object_5.geometry}
              material={materials.wood2}
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials.wood3}
            />
          </group>
          <group
            position={[-8.3, 23.07, 2.16]}
            rotation={[0.73, 0, 0]}
            scale={[1, 1.23, 1.28]}
          >
            <mesh
              geometry={nodes.Object_8.geometry}
              material={materials.plane3}
            />
            <mesh
              geometry={nodes.Object_9.geometry}
              material={materials.plane2}
            />
            <mesh
              geometry={nodes.Object_10.geometry}
              material={materials.plane1}
            />
          </group>
          <group
            position={[0.02, 12.64, -0.05]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.49, 1.48, 0.49]}
          >
            <mesh
              geometry={nodes.Object_12.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <group position={[0, -1.06, -0.01]} scale={1.19}>
            <mesh
              geometry={nodes.Object_14.geometry}
              material={materials.ground}
            />
            <mesh
              geometry={nodes.Object_15.geometry}
              material={materials.water}
            />
          </group>
          <mesh
            geometry={nodes.Object_17.geometry}
            material={materials.stone4}
          />
          <mesh
            geometry={nodes.Object_18.geometry}
            material={materials.stone1}
          />
          <mesh
            geometry={nodes.Object_19.geometry}
            material={materials.stone2}
          />
          <group position={[0, 1.91, 0]} rotation={[0, -1.36, 0]} scale={0.89}>
            <mesh
              geometry={nodes.Object_21.geometry}
              material={materials.stone1}
            />
            <mesh
              geometry={nodes.Object_22.geometry}
              material={materials.stone3}
            />
          </group>
          <group position={[0, 3.73, 0]} rotation={[0, -1.49, 0]} scale={0.9}>
            <mesh
              geometry={nodes.Object_24.geometry}
              material={materials.stone1}
            />
            <mesh
              geometry={nodes.Object_25.geometry}
              material={materials.stone3}
            />
            <mesh
              geometry={nodes.Object_26.geometry}
              material={materials.stone2}
            />
          </group>
          <group position={[0, 5.61, 0]} rotation={[0, -0.69, 0]} scale={0.94}>
            <mesh
              geometry={nodes.Object_28.geometry}
              material={materials.stone1}
            />
            <mesh
              geometry={nodes.Object_29.geometry}
              material={materials.stone2}
            />
            <mesh
              geometry={nodes.Object_30.geometry}
              material={materials.stone3}
            />
          </group>
          <group position={[2.53, -0.82, 9.28]}>
            <mesh
              geometry={nodes.Object_32.geometry}
              material={materials.stone1}
            />
          </group>
          <group
            position={[10.32, -0.82, 4.71]}
            rotation={[-0.24, -0.22, -0.66]}
            scale={1.38}
          >
            <mesh
              geometry={nodes.Object_34.geometry}
              material={materials.stone2}
            />
          </group>
          <group position={[-7.28, -0.82, 8.37]} scale={0.62}>
            <mesh
              geometry={nodes.Object_36.geometry}
              material={materials.stone4}
            />
          </group>
          <group position={[0.1, -0.82, 8.03]} scale={0.62}>
            <mesh
              geometry={nodes.Object_38.geometry}
              material={materials.stone3}
            />
          </group>
          <group
            position={[-3.72, -0.82, 12.95]}
            rotation={[0.06, 0.34, 0.67]}
            scale={[1, 1, 1.65]}
          >
            <mesh
              geometry={nodes.Object_40.geometry}
              material={materials.stone2}
            />
          </group>
          <group
            position={[-5.97, -0.69, -9.07]}
            rotation={[-1.67, 0.49, 0.96]}
          >
            <mesh
              geometry={nodes.Object_42.geometry}
              material={materials.stone3}
            />
          </group>
          <group
            position={[-3.21, -0.94, -13.31]}
            rotation={[-1.67, 0.49, 0.96]}
            scale={0.62}
          >
            <mesh
              geometry={nodes.Object_44.geometry}
              material={materials.stone4}
            />
          </group>
          <group position={[10.04, -0.82, -6.99]} scale={2.26}>
            <mesh
              geometry={nodes.Object_46.geometry}
              material={materials.stone1}
            />
          </group>
          <group
            position={[6.43, -0.94, -5.59]}
            rotation={[-1.67, 0.49, 0.96]}
            scale={0.62}
          >
            <mesh
              geometry={nodes.Object_48.geometry}
              material={materials.stone2}
            />
          </group>
          <group
            position={[7.24, -0.94, 11.77]}
            rotation={[-1.67, 0.49, 0.96]}
            scale={0.36}
          >
            <mesh
              geometry={nodes.Object_50.geometry}
              material={materials.stone4}
            />
          </group>
          <group
            position={[-6.89, -0.94, 1.99]}
            rotation={[-1.67, 0.49, 0.96]}
            scale={0.36}
          >
            <mesh
              geometry={nodes.Object_52.geometry}
              material={materials.stone2}
            />
          </group>
          <group position={[7.06, -0.82, 2.28]} scale={0.64}>
            <mesh
              geometry={nodes.Object_54.geometry}
              material={materials.stone3}
            />
          </group>
          {/* <group
            position={[-7.18, 6.34, 1.18]}
            rotation={[2.52, 0.28, 0.3]}
            scale={0.44}
          >
            <mesh
              geometry={nodes.Object_56.geometry}
              material={materials["grey.001"]}
            />
            <mesh
              geometry={nodes.Object_57.geometry}
              material={materials["dark.001"]}
            />
            <mesh
              geometry={nodes.Object_58.geometry}
              material={materials["marooniguess.001"]}
            />
            <mesh
              geometry={nodes.Object_59.geometry}
              material={materials["blue.001"]}
            />
            <mesh
              geometry={nodes.Object_60.geometry}
              material={materials["brown.001"]}
            />
            <mesh
              geometry={nodes.Object_61.geometry}
              material={materials.blue_deep}
            />
          </group> */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/well/scene.gltf");
