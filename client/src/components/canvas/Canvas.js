import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ground from "./ground/Ground";
import Camera from "./setting/Camera";
import { Provider } from "react-redux";
import store from "../../stores/store";
import Character from "../character/Character";
import { BulletinBoard } from "./object/BulletinBoard";

const Index = () => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 60,
        far: 250000,
        near: 3,
      }}
    >
      <Provider store={store}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        {/* <Html></Html> */}
        <Character />
        <Ground />
        <Camera />
        <BulletinBoard />
      </Provider>
    </Canvas>
  );
};

export default Index;
