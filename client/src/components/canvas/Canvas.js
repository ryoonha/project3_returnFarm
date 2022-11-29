import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/cannon";
import React from "react";
import Ground from "./ground/Ground";
import Camera from "./setting/Camera";
import { Provider } from "react-redux";
import store from "../../stores/store";
import Character from "../character/Character";
import { Light } from "./setting/Light";
import Environment from "./environment/Environment";
import Object from "./object/Object";

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
        <Light />
        <Camera />
        <Physics gravity={[0, -1, 0]}>
          <Debug color="black" scale={1.5}>
            <Character />
            <Ground />
            <Environment />
            <Object />
          </Debug>
        </Physics>
      </Provider>
    </Canvas>
  );
};

export default Index;
