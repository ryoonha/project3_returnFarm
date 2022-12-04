import React, { memo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSelector } from "react-redux";

function Corn({ demo }) {
  const { nodes, materials, animations } = useGLTF("/models/corn/scene.gltf");
  const ref = useRef();
  // const { actions } = useAnimations(animations, group);

  const grow = useSelector((state) => state.test.check);
  console.log(grow);
  useFrame(() => {
    const { x, y, z } = ref.current.scale;
    if (ref.current && grow) {
      //console.log(ref.current);
      ref.current.scale.set(x + 0.01, y + 0.01, z + 0.01);
    } else if (ref.current && !grow) {
      ref.current.scale.set(x + 0.0001, y + 0.0001, z + 0.0001);
    }
  });

  return (
    <group
      ref={ref}
      dispose={null}
      rotation={[Math.PI / 2, 0, 0]}
      scale={5}
      onClick={() => {
        console.log("클릭");
      }}
    >
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.62}
        >
          <group
            name="fdd38405c86b44e49e5f7a62b0d2f0f7fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Circle_020"
                  position={[0.04, 3.45, 0.09]}
                  rotation={[-1.59, 0.02, 2.34]}
                  scale={0.08}
                >
                  <mesh
                    name="Circle_020_corn_plant__corn_texture_png_0"
                    geometry={
                      nodes.Circle_020_corn_plant__corn_texture_png_0.geometry
                    }
                    material={materials.corn_plant__corn_texture_png}
                  />
                  <mesh
                    name="Circle_020_corn_plant_001__corn_texture_png_001_0"
                    geometry={
                      nodes.Circle_020_corn_plant_001__corn_texture_png_001_0
                        .geometry
                    }
                    material={materials.corn_plant_001__corn_texture_png_001}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default memo(Corn);

useGLTF.preload("/models/corn/scene.gltf");
