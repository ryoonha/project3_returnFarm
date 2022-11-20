import { Canvas } from "@react-three/fiber";
import React from "react";
import Ground from "./ground/Ground";
import Camera from "./setting/Camera";
import { Provider } from "react-redux";
import store from "../../stores/store";
import Character from "../character/Character";
import { BulletinBoard } from "./object/BulletinBoard";
import { Light } from "./setting/Light";

const Index = () => {
  return (
    <>
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
          <Character />
          <Ground />
          <Camera />
          <BulletinBoard />
        </Provider>
      </Canvas>
    </>
  );
};

export default Index;
