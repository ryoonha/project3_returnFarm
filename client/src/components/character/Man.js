import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";
import Control from "./Control";
import { Vector3 } from "three";

export function Man() {
  const [vec] = useState(() => new Vector3());
  const model = useRef();
  const { camera } = useThree();
  console.log(camera);
  const { nodes, materials, animations } = useGLTF(
    `/models/character/man.gltf`
  );
  // 하나의 모델 여러 번 사용하기.. 아직 해결 못함 ㅠㅠ
  // const copiedScene = useMemo(() => scene.clone(), [scene]);

  const { actions, names } = useAnimations(animations, model);

  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const { up, right, down, left } = useSelector((state) => state.character);
  useFrame(() => {
    if (model.current) {
      const { x, y, z } = model.current.position;
      camera.lookAt(x, y, z + 5);
      camera.position.lerp(vec.set(x, y + 10, z - 10), 0.1);
    }
    if (model.current && (up || right || down || left)) {
      if (up && left) {
        model.current.position.z += 0.1;
        model.current.position.x += 0.1;
        model.current.rotation.y = deg2rad(45);
      } else if (up && right) {
        model.current.position.z += 0.1;
        model.current.position.x -= 0.1;
        model.current.rotation.y = deg2rad(315);
      } else if (down && left) {
        model.current.position.z -= 0.1;
        model.current.position.x += 0.1;
        model.current.rotation.y = deg2rad(135);
      } else if (down && right) {
        model.current.position.z -= 0.1;
        model.current.position.x -= 0.1;
        model.current.rotation.y = deg2rad(225);
      } else if (up) {
        model.current.position.z += 0.1;
        model.current.rotation.y = deg2rad(0);
      } else if (right) {
        model.current.position.x -= 0.1;
        model.current.rotation.y = deg2rad(270);
      } else if (down) {
        model.current.position.z -= 0.1;
        model.current.rotation.y = deg2rad(180);
      } else if (left) {
        model.current.position.x += 0.1;
        model.current.rotation.y = deg2rad(90);
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
    <group ref={model} dispose={null}>
      {/* <Html>{data.nickName}</Html> */}
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
