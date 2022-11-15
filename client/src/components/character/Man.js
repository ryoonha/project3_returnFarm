import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSelector } from "react-redux";
import Control from "./Control";

export function Man({ data, userId, userTest }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `/models/character/man.gltf`
  );
  // 하나의 모델 여러 번 사용하기.. 아직 해결 못함 ㅠㅠ
  // const copiedScene = useMemo(() => scene.clone(), [scene]);

  const { actions, names } = useAnimations(animations, group);

  const { up, right, down, left } = useSelector((state) => state.character);
  console.log(nodes);
  console.log(userId);
  console.log(userTest);
  console.log(data.nickName === userId[0]);
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
      <Html>{data.nickName}</Html>
      <Control />
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials["Bodymat.001"]}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            name="Bottoms"
            geometry={nodes.Bottoms.geometry}
            material={materials["Bottommat.001"]}
            skeleton={nodes.Bottoms.skeleton}
          />
          <skinnedMesh
            name="Eyelashes"
            geometry={nodes.Eyelashes.geometry}
            material={materials["Eyelashmat.001"]}
            skeleton={nodes.Eyelashes.skeleton}
          />
          <skinnedMesh
            name="Eyes"
            geometry={nodes.Eyes.geometry}
            material={materials["Bodymat.001"]}
            skeleton={nodes.Eyes.skeleton}
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials["Hairmat.001"]}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            name="Shoes"
            geometry={nodes.Shoes.geometry}
            material={materials["Shoesmat.001"]}
            skeleton={nodes.Shoes.skeleton}
          />
          <skinnedMesh
            name="Tops"
            geometry={nodes.Tops.geometry}
            material={materials["Topmat.001"]}
            skeleton={nodes.Tops.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character/man.gltf");
