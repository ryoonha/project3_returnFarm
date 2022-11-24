import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import { Vector3 } from "three";
import { handleTile } from "../../stores/reducers/stateSlice";

export function Man({ nickName }) {
  const dispatch = useDispatch();
  const tilePos = useSelector((state) => state.state.tileSelect);
  const [vec] = useState(() => new Vector3());
  const model = useRef();
  const nameRef = useRef();
  const { camera } = useThree();
  const { nodes, materials, animations } = useGLTF(
    `/models/character/man.gltf`
  );
  const { actions, names } = useAnimations(animations, model);

  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const { up, right, down, left, shift } = useSelector(
    (state) => state.character
  );
  useFrame(() => {
    if (model.current) {
      const { x, y, z } = model.current.position;
      // console.log(nameRef);
      // console.log(nameRef.current.position);
      // const { nx, ny, nz } = nick.current.position;
      // nick.current.position.lerp(x, y, z, 0.1);
      // console.log(nick.current.position);
      camera.lookAt(x, y, z + 5);
      //camera.position.lerp(vec.set(x, y + 15, z - 15), 0.1);

      if (
        tilePos.x &&
        tilePos.z &&
        (tilePos.x + 10 < x ||
          tilePos.x - 10 > x ||
          tilePos.z + 10 < z ||
          tilePos.z - 10 > z)
      ) {
        dispatch(handleTile({ x: null, z: null, data: null }));
      }
    }
    if (model.current && (up || right || down || left)) {
      if (up && left) {
        if (shift) {
          model.current.position.z += 0.2;
          model.current.position.x += 0.2;
          model.current.rotation.y = deg2rad(45);
        } else {
          model.current.position.z += 0.1;
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(45);
        }
      } else if (up && right) {
        if (shift) {
          model.current.position.z += 0.2;
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(315);
        } else {
          model.current.position.z += 0.1;
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(315);
        }
      } else if (down && left) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.position.x += 0.2;
          model.current.rotation.y = deg2rad(135);
        } else {
          model.current.position.z -= 0.1;
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(135);
        }
      } else if (down && right) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(225);
        } else {
          model.current.position.z -= 0.1;
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(225);
        }
      } else if (up) {
        if (shift) {
          model.current.position.z += 0.2;
          model.current.rotation.y = deg2rad(0);
        } else {
          model.current.position.z += 0.1;
          model.current.rotation.y = deg2rad(0);
        }
      } else if (right) {
        if (shift) {
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(270);
        } else {
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(270);
        }
      } else if (down) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.rotation.y = deg2rad(180);
        } else {
          model.current.position.z -= 0.1;
          model.current.rotation.y = deg2rad(180);
        }
      } else if (left) {
        if (shift) {
          model.current.position.x += 0.2;
          model.current.rotation.y = deg2rad(90);
        } else {
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(90);
        }
      }
    }
  });

  useEffect(() => {
    if ((up || right || down || left) && shift) {
      actions.idle.stop();
      actions.walking.stop();
      actions.running.play();
    } else if (up || right || down || left) {
      actions.idle.stop();
      actions.running.stop();
      actions.walking.play();
    } else {
      actions.walking.stop();
      actions.running.stop();
      actions.idle.play();
    }
  }, [up, right, down, left, shift]);

  return (
    <group ref={model} dispose={null} position={[0, 0, 0]}>
      {/* <Html
        // transform
        // center
        ref={nameRef}
        className="cc cn"
        style={{ backgroundColor: "gray", width: "50px" }}
        position={[0, 0, 0]}
      >
        {nickName}
      </Html> */}
      <Control />
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.02}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="Alpha_Joints"
            geometry={nodes.Alpha_Joints.geometry}
            material={materials.Alpha_Joints_MAT}
            skeleton={nodes.Alpha_Joints.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Alpha_Surface"
            geometry={nodes.Alpha_Surface.geometry}
            material={materials.Alpha_Body_MAT}
            skeleton={nodes.Alpha_Surface.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(`/models/character/man.gltf`);
