import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSelector } from "react-redux";

export function Xbot({ data, userTest }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/character/Xbot.gltf"
  );
  const { actions } = useAnimations(animations, group);

  const { up, right, down, left } = useSelector((state) => state.character);
  useFrame(() => {
    if (userTest === data.nickName) {
      if (group.current && (up || right || down || left)) {
        if (up && left) {
          group.current.position.z += 0.1;
          group.current.position.x += 0.1;
        } else if (up && right) {
          group.current.position.z += 0.1;
          group.current.position.x -= 0.1;
        } else if (down && left) {
          group.current.position.z -= 0.1;
          group.current.position.x += 0.1;
        } else if (down && right) {
          group.current.position.z -= 0.1;
          group.current.position.x -= 0.1;
        } else if (up) {
          group.current.position.z += 0.1;
        } else if (right) {
          group.current.position.x -= 0.1;
        } else if (down) {
          group.current.position.z -= 0.1;
        } else if (left) {
          group.current.position.x += 0.1;
        }
      }
    }
  });

  useEffect(() => {
    if (up || right || down || left) {
      actions.idle.stop();
      actions.walking.play();
    } else {
      actions.walking.stop();
      actions.idle.play();
    }
  }, [up, right, down, left]);

  useEffect(() => {
    if (actions.idle) {
      // actions.walking.play();
      actions.idle.play();
    }
  }, [actions]);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Beta_Joints"
            geometry={nodes.Beta_Joints.geometry}
            material={materials.Beta_Joints_MAT1}
            skeleton={nodes.Beta_Joints.skeleton}
          />
          <skinnedMesh
            name="Beta_Surface"
            geometry={nodes.Beta_Surface.geometry}
            material={materials.Beta_HighLimbsGeoSG3}
            skeleton={nodes.Beta_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character/Xbot.gltf");
