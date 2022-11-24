import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import { Vector3 } from "three";
import { handleTile } from "../../stores/reducers/stateSlice";
import { useBox } from "@react-three/cannon";

export function Girl() {
  const dispatch = useDispatch();
  const tilePos = useSelector((state) => state.state.tileSelect);
  const [vec] = useState(() => new Vector3());
  const model = useRef();
  const group = useRef();
  const nameRef = useRef();
  const { camera } = useThree();
  const { nodes, materials, animations } = useGLTF(
    "/models/character/girl.gltf"
  );

  // const [model, api] = useBox(() => ({
  //   type: "Kinematic",
  //   mass: 1,
  //   // position: [0, 0, 0],
  // }));
  // return (
  //   <mesh ref={ref}>
  //     <boxGeometry />
  //     <meshNormalMaterial />
  //   </mesh>
  // );
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
      camera.position.lerp(vec.set(x, y + 10, z - 15), 0.1);

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
          model.current.rotation.y = deg2rad(35);
        } else {
          model.current.position.z += 0.1;
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(35);
        }
      } else if (up && right) {
        if (shift) {
          model.current.position.z += 0.2;
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(305);
        } else {
          model.current.position.z += 0.1;
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(305);
        }
      } else if (down && left) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.position.x += 0.2;
          model.current.rotation.y = deg2rad(125);
        } else {
          model.current.position.z -= 0.1;
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(125);
        }
      } else if (down && right) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(215);
        } else {
          model.current.position.z -= 0.1;
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(215);
        }
      } else if (up) {
        if (shift) {
          model.current.position.z += 0.2;
          model.current.rotation.y = deg2rad(-10);
        } else {
          model.current.position.z += 0.1;
          model.current.rotation.y = deg2rad(-10);
        }
      } else if (right) {
        if (shift) {
          model.current.position.x -= 0.2;
          model.current.rotation.y = deg2rad(260);
        } else {
          model.current.position.x -= 0.1;
          model.current.rotation.y = deg2rad(260);
        }
      } else if (down) {
        if (shift) {
          model.current.position.z -= 0.2;
          model.current.rotation.y = deg2rad(170);
        } else {
          model.current.position.z -= 0.1;
          model.current.rotation.y = deg2rad(170);
        }
      } else if (left) {
        if (shift) {
          model.current.position.x += 0.2;
          model.current.rotation.y = deg2rad(80);
        } else {
          model.current.position.x += 0.1;
          model.current.rotation.y = deg2rad(80);
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
    <group ref={model} dispose={null} rotation={[deg2rad(5), deg2rad(-10), 0]}>
      <Control />
      <group name="Scene">
        <group
          name="metarig"
          position={[0, -0.19, -0.03]}
          rotation={[0, -0.48, -0.02]}
        >
          <primitive object={nodes.spine} />
          <skinnedMesh
            castShadow
            name="bows"
            geometry={nodes.bows.geometry}
            material={materials.glasses}
            skeleton={nodes.bows.skeleton}
          />
          <group name="Cube001">
            <skinnedMesh
              castShadow
              name="Cube001_1"
              geometry={nodes.Cube001_1.geometry}
              material={materials.skin}
              skeleton={nodes.Cube001_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_2"
              geometry={nodes.Cube001_2.geometry}
              material={materials.shorts}
              skeleton={nodes.Cube001_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_3"
              geometry={nodes.Cube001_3.geometry}
              material={materials.Tshirt}
              skeleton={nodes.Cube001_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_4"
              geometry={nodes.Cube001_4.geometry}
              material={materials.glasses}
              skeleton={nodes.Cube001_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_5"
              geometry={nodes.Cube001_5.geometry}
              material={materials.lens}
              skeleton={nodes.Cube001_5.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_6"
              geometry={nodes.Cube001_6.geometry}
              material={materials.brows}
              skeleton={nodes.Cube001_6.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_7"
              geometry={nodes.Cube001_7.geometry}
              material={materials["skin.001"]}
              skeleton={nodes.Cube001_7.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Cube001_8"
              geometry={nodes.Cube001_8.geometry}
              material={materials.eyes}
              skeleton={nodes.Cube001_8.skeleton}
            />
          </group>
          <skinnedMesh
            castShadow
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={materials.sandals}
            skeleton={nodes.Cube002.skeleton}
          />
          <group name="hair">
            <skinnedMesh
              castShadow
              name="Plane007"
              geometry={nodes.Plane007.geometry}
              material={materials.brows}
              skeleton={nodes.Plane007.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Plane007_1"
              geometry={nodes.Plane007_1.geometry}
              material={materials["brows.001"]}
              skeleton={nodes.Plane007_1.skeleton}
            />
          </group>
          <group name="hair2">
            <skinnedMesh
              castShadow
              name="Plane004"
              geometry={nodes.Plane004.geometry}
              material={materials.brows}
              skeleton={nodes.Plane004.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Plane004_1"
              geometry={nodes.Plane004_1.geometry}
              material={materials["brows.001"]}
              skeleton={nodes.Plane004_1.skeleton}
            />
          </group>
          <group name="hat">
            <skinnedMesh
              castShadow
              name="Circle"
              geometry={nodes.Circle.geometry}
              material={materials.hat}
              skeleton={nodes.Circle.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Circle_1"
              geometry={nodes.Circle_1.geometry}
              material={materials.ribbon}
              skeleton={nodes.Circle_1.skeleton}
            />
          </group>
          <group name="ponytails">
            <skinnedMesh
              castShadow
              name="BezierCurve"
              geometry={nodes.BezierCurve.geometry}
              material={materials.brows}
              skeleton={nodes.BezierCurve.skeleton}
            />
            <skinnedMesh
              castShadow
              name="BezierCurve_1"
              geometry={nodes.BezierCurve_1.geometry}
              material={materials["brows.001"]}
              skeleton={nodes.BezierCurve_1.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character/girl.gltf");
