import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Physics, RigidBody, Debug } from "@react-three/rapier";
import Ground from "./ground/Ground";
import Camera from "./setting/Camera";
import { Provider } from "react-redux";
import store from "../../stores/store";
import Character from "../character/Character";
import { Light } from "./setting/Light";
import Environment from "./environment/Environment";
import Object from "./object/Object";
import useKeyEvents from "../../hooks/useKeyEvents";

const Index = () => {
  // 단축키 활성화 함수
  useKeyEvents();
  return (
    <Canvas
      shadows
      camera={{
        fov: 60,
        far: 15000,
        near: 3,
      }}
    >
      <Provider store={store}>
        <Suspense fallback={null}>
          <Light />
          <Camera />
          <Physics>
            <Debug />
            <Character />
            <Ground />
            <Environment />
            <Object />
          </Physics>
        </Suspense>
      </Provider>
    </Canvas>
  );
};

export default Index;
