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
import { PositionalAudio } from "@react-three/drei";
import { soundData } from "../../data/sounds/sound";

const Index = () => {
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
          <Physics colliders={false}>
            {/* <Debug /> */}
            <Character />
            <Ground />
            <Environment />
            <Object />
          </Physics>
        </Suspense>
        <PositionalAudio url={soundData["background"]} />
      </Provider>
    </Canvas>
  );
};
export default Index;
