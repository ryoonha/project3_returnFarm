import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import Control from "./Control";
import { Quaternion, Vector3 } from "three";
import { handleTile } from "../../stores/reducers/stateSlice";
import { RigidBody } from "@react-three/rapier";

const moveSpeed = 0.08;
const runSpeed = 0.2;
export function Girl({ nickName }) {
  const dispatch = useDispatch();
  const tilePos = useSelector((state) => state.state.tileSelect);
  const [vec] = useState(() => new Vector3());
  const modelPos = useRef();
  const model = useRef();
  const text = useRef();
  const test = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/character/girl.gltf"
  );
  // console.log(test);
  // console.log(api);
  const { actions, names } = useAnimations(animations, model);
  const deg2rad = (degrees) => degrees * (Math.PI / 180);
  const { up, right, down, left, shift } = useSelector(
    (state) => state.character
  );
  const getDirectionOffset = (w, s, d, a) => {
    let directionOffset = 0; // w

    if (w) {
      // plm
    } else if (s) {
      directionOffset = Math.PI; // s
    } else if (a) {
      directionOffset = Math.PI / 2; // a
    } else if (d) {
      directionOffset = -Math.PI / 2; // d
    }
    return directionOffset;
  };

  useFrame(({ camera }) => {
    if (modelPos.current) {
      const { x, y, z } = modelPos.current.position;
      // console.log(camera);
      camera.lookAt(x, y, z + 5);
      camera.position.lerp(vec.set(x, y + 20, z - 25), 0.1);
      text.current.quaternion.copy(camera.quaternion);

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
    if (modelPos.current && (up || right || down || left)) {
      if (up && left) {
        if (shift) {
          modelPos.current.position.z += runSpeed;
          modelPos.current.position.x += runSpeed;
          model.current.rotation.y = deg2rad(35);
        } else {
          modelPos.current.position.z += moveSpeed;
          modelPos.current.position.x += moveSpeed;
          model.current.rotation.y = deg2rad(35);
        }
      } else if (up && right) {
        if (shift) {
          modelPos.current.position.z += runSpeed;
          modelPos.current.position.x -= runSpeed;
          model.current.rotation.y = deg2rad(305);
        } else {
          modelPos.current.position.z += moveSpeed;
          modelPos.current.position.x -= moveSpeed;
          model.current.rotation.y = deg2rad(305);
        }
      } else if (down && left) {
        if (shift) {
          modelPos.current.position.z -= runSpeed;
          modelPos.current.position.x += runSpeed;
          model.current.rotation.y = deg2rad(125);
        } else {
          modelPos.current.position.z -= moveSpeed;
          modelPos.current.position.x += moveSpeed;
          model.current.rotation.y = deg2rad(125);
        }
      } else if (down && right) {
        if (shift) {
          modelPos.current.position.z -= runSpeed;
          modelPos.current.position.x -= runSpeed;
          model.current.rotation.y = deg2rad(215);
        } else {
          modelPos.current.position.z -= moveSpeed;
          modelPos.current.position.x -= moveSpeed;
          model.current.rotation.y = deg2rad(215);
        }
      } else if (up) {
        if (shift) {
          modelPos.current.position.z += runSpeed;
          model.current.rotation.y = deg2rad(-10);
        } else {
          modelPos.current.position.z += moveSpeed;
          model.current.rotation.y = deg2rad(-10);
        }
      } else if (right) {
        if (shift) {
          modelPos.current.position.x -= runSpeed;
          model.current.rotation.y = deg2rad(260);
        } else {
          modelPos.current.position.x -= moveSpeed;
          model.current.rotation.y = deg2rad(260);
        }
      } else if (down) {
        if (shift) {
          modelPos.current.position.z -= runSpeed;
          model.current.rotation.y = deg2rad(170);
        } else {
          modelPos.current.position.z -= moveSpeed;
          model.current.rotation.y = deg2rad(170);
        }
      } else if (left) {
        if (shift) {
          modelPos.current.position.x += runSpeed;
          model.current.rotation.y = deg2rad(80);
        } else {
          modelPos.current.position.x += moveSpeed;
          model.current.rotation.y = deg2rad(80);
        }
      }
    }
    //model.current.rotation.copy(camera.rotation);
    // model.current.rotation.set(0, -camera.rotation._y, 0);
    // let { _x, _y, _z, _w } = camera.quaternion;
    // let directionOffset = getDirectionOffset(false, true, false, false);

    // const rotateAngleFrontAxis = new Vector3(0, 1, 0);
    // let rotateQuarternion = new Quaternion();
    // rotateQuarternion.setFromAxisAngle(rotateAngleFrontAxis, directionOffset);
    // model.current.quaternion.rotateTowards(rotateQuarternion, 0.2);
    //  model.current.quaternion.copy(new Quaternion(_x, _y, _z, _w));
    // console.log(camera.quaternion);

    //console.log(model.current.quaternion);
    // console.log(camera.quaternion);
  });
  // useEffect(() => {
  //   api.velocity.subscribe((v) => (velocity.current = v));
  //   api.angularVelocity.subscribe((av) => (angularVelocity.current = av));
  // }, []);

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
    // <RigidBody ref={test} type={"fixed"}>
    <group ref={modelPos} dispose={null} position={[0, 0, -80]}>
      <Control />
      <Text
        ref={text}
        color={"rgb(58, 58, 58)"}
        fontSize={1}
        maxWidth={100}
        lineHeight={9}
        letterSpacing={0.02}
        textAlign={"left"}
        anchorX="center"
        anchorY="bottom"
      >
        {nickName}
      </Text>
      <group ref={model} name="Scene">
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
    // </RigidBody>
  );
}

useGLTF.preload("/models/character/girl.gltf");
