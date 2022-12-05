import React, { useEffect, useRef, useState } from "react";
import { Html, Text, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import styled from "styled-components";
import handleSound from "../../../data/sounds/sound";
import { useDispatch } from "react-redux";
import { handleEventLock } from "../../../stores/reducers/stateSlice";

const CatMarket = styled.div`
  position: absolute;
  flex-direction: column;
  top: -120px;
  left: -25px;
  width: 300px;
  height: 100px;
  background-color: rgba(240, 248, 255, 0.767);

  .chackBox {
    width: 100%;
    div {
      width: 100%;
      :hover {
        background-color: rgba(128, 128, 128, 0.774);
      }
    }
  }
`;

const SellBox = styled.div``;

const Sell = () => {
  return (
    <SellBox>
      <div>와우!</div>
    </SellBox>
  );
};

export function Cat(props) {
  const dispatch = useDispatch();
  const { nodes, materials } = useGLTF("/models/cat/scene.gltf");
  const ref = useRef();
  const [intersecting, setIntersection] = useState(false);
  const [check, setChack] = useState(false);

  const styles = {
    width: intersecting ? "250px" : "150px",
    height: "auto",
    color: "black",
    background: "rgba(129, 129, 129, 0.521)",
    textAlign: "center",
    fontSize: "30px",
    borderRadius: "20px",
    transform: `translate(${intersecting ? "-120px" : "-70px"},-150px)`,
    zIndex: "-5000",
  };

  const boxArr = {
    sell: <Sell />,
    buy: null,
  };

  return (
    <RigidBody ref={ref} type="fixed">
      {intersecting ? (
        <Html style={styles}>
          <CatMarket
            className="cc"
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            {!check ? (
              <div className="chackBox">
                <div
                  onClick={() => {
                    setChack("buy");
                    handleSound("click");
                  }}
                >
                  구입
                </div>
                <div
                  onClick={() => {
                    setChack("sell");
                    handleSound("click");
                  }}
                >
                  판매
                </div>
              </div>
            ) : null}
            {boxArr[check] ? boxArr[check] : null}
          </CatMarket>
          무엇이 필요하냥?
        </Html>
      ) : (
        <Html style={styles}>
          <div
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            냥냥~
          </div>
        </Html>
      )}

      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            geometry={nodes.Object_2.geometry}
            material={materials.lambert2SG}
          />
          <mesh
            castShadow
            geometry={nodes.Object_3.geometry}
            material={materials.lambert2SG}
          />
        </group>
      </group>
      <CuboidCollider
        args={[10, 5, 10]}
        sensor
        onIntersectionEnter={() => {
          setIntersection(true);
        }}
        onIntersectionExit={() => {
          setChack(false);
          setIntersection(false);
        }}
      />
    </RigidBody>
  );
}

useGLTF.preload("/models/cat/scene.gltf");
