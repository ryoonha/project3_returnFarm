import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Lake(props) {
  const { nodes, materials } = useGLTF("/models/objects/lake/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[98.17, -332.79, 491.31]}
            rotation={[-1.59, 0.04, 0.67]}
            scale={51.52}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plants_Material_0.geometry}
              material={materials.Material}
            />
          </group>
          <group
            position={[-96.58, -294.34, 589.3]}
            rotation={[-Math.PI / 2, 0, 2.11]}
            scale={43.92}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0_1.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0_2.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0_3.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0_4.geometry}
              material={materials["Material.006"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SeaGrass_Material006_0_5.geometry}
              material={materials["Material.006"]}
            />
          </group>
          <group
            position={[-604.18, -453.8, 260.04]}
            rotation={[-1.25, 0, 1.25]}
            scale={119.32}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Rockss_Material005_0.geometry}
              material={materials["Material.005"]}
            />
          </group>
          <group
            position={[-307.66, -439.26, 743.52]}
            rotation={[-Math.PI / 2, -0.08, 1.38]}
            scale={114.62}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Lake_Tree_Material004_0.geometry}
              material={materials["Material.004"]}
            />
          </group>
          <group
            position={[-410.6, 194.04, -834.09]}
            rotation={[-Math.PI / 2, 0, 0.42]}
            scale={23.57}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Grass_Grass_0.geometry}
              material={materials.Grass}
            />
          </group>
          <group
            position={[-505.65, 113.51, 736.27]}
            rotation={[-1.53, 0.02, -1.05]}
            scale={1.92}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Ducks_Material003_0.geometry}
              material={materials["Material.003"]}
            />
          </group>
          <group
            position={[-78.79, -579.26, -23.64]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1231.55}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.WATER_Water001_0.geometry}
              material={materials["Water.001"]}
            />
          </group>
          <group
            position={[-78.79, -627.42, -23.64]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1298.96}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.LAND_Material002_0.geometry}
              material={materials["Material.002"]}
            />
          </group>
          <group
            position={[164.04, 166.44, 166.46]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={15}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Rope_Canoe_0.geometry}
              material={materials.Canoe}
            />
          </group>
          <group
            position={[-67.17, 226.93, -280.9]}
            rotation={[-1.12, 0, 0]}
            scale={[3.86, 46.41, 3.86]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube002_Dock_0.geometry}
              material={materials.Dock}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/objects/lake/scene.gltf");
