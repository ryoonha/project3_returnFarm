import React, { useRef } from "react";
import { Mountain } from "../../models/environment/Mountain";
import { Cloud } from "../../models/environment/Cloud";
import { SmallMountain2 } from "../../models/environment/SmallMountain2";
import { SmallMountain } from "../../models/environment/SmallMountain";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

const Environment = () => {
  const cloudRef = useRef();
  const getdirect = () => Math.floor(Math.random() * 2);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const cloudNumArr = Array(30).fill(false);
  const deg2rad = (degrees) => degrees * (Math.PI / 180);

  const Line = (props) => {
    const [boxRef, boxApi] = useBox(() => ({
      type: "Static",
      mass: 1,
      ...props,
    }));

    return (
      <mesh ref={boxRef}>
        <boxGeometry />
      </mesh>
    );
  };

  useFrame(() => {
    if (cloudRef.current) {
      const { y } = cloudRef.current.rotation;
      if (y >= deg2rad(360)) {
        cloudRef.current.rotation.y = 0;
      } else {
        cloudRef.current.rotation.y += deg2rad(0.005);
      }
    }
  });
  return (
    <group>
      <Mountain position={[300, -30, 500]} scale={80} />
      <group ref={cloudRef}>
        {cloudNumArr.map((_, index) => (
          <Cloud
            key={index}
            position={
              getdirect() === 1
                ? [getRandom(-120, 120), 80, getRandom(-120, 120)]
                : [getRandom(120, -120), 80, getRandom(120, -120)]
            }
            rotation={[0, Math.floor(Math.random() * 10), 0]}
            scale={getRandom(5, 1)}
          />
        ))}
      </group>
      <group name="작은 산 모델">
        <SmallMountain
          position={[130, -15, -90]}
          scale={3}
          rotation={[0, 0.5, 0]}
        />
        <SmallMountain2 position={[130, -15, -15]} scale={2.3} />
        <SmallMountain position={[145, -15, 60]} scale={3} />
        <SmallMountain2 position={[140, -15, 110]} scale={3} />
        <SmallMountain
          position={[90, -15, 140]}
          scale={3}
          rotation={[0, 1, -0.1]}
        />
        <SmallMountain2 position={[0, -15, 150]} scale={3} />
        <SmallMountain2
          position={[-90, -15, 135]}
          scale={3}
          rotation={[0, 1, -0.1]}
        />
        <SmallMountain2
          position={[-130, -15, 100]}
          scale={3}
          rotation={[0, -0.5, 0]}
        />
        <SmallMountain
          position={[-140, -15, 40]}
          scale={3}
          rotation={[0, -0.5, 0]}
        />
        <SmallMountain2
          position={[-150, -15, -50]}
          scale={3}
          rotation={[0, -0.5, 0]}
        />
        <SmallMountain
          position={[-130, -15, -110]}
          scale={3}
          rotation={[0, -0.5, 0]}
        />
        <SmallMountain
          position={[-80, -15, -130]}
          scale={3}
          rotation={[0.1, -0.8, 0]}
        />
        <SmallMountain2
          position={[0, -15, -160]}
          scale={3}
          rotation={[0, -0.9, 0]}
        />
        <SmallMountain2
          position={[75, -15, -150]}
          scale={3}
          rotation={[0, -1.8, 0]}
        />
        <SmallMountain2
          position={[200, -15, -15]}
          scale={2.5}
          rotation={[0, -1.8, 0]}
        />
      </group>
      <group name="테두리 충돌 박스">
        <Line
          position={[100, 5, 40]}
          rotation={[0, deg2rad(90), 0]}
          args={[100, 10, 2]}
        />
        <Line
          position={[20, 5, 110]}
          rotation={[0, deg2rad(90), 0]}
          args={[1, 10, 100]}
        />
        <Line
          position={[-82, 5, 83]}
          rotation={[0, deg2rad(45), 0]}
          args={[1, 10, 50]}
        />
        <Line
          position={[-100, 5, -10]}
          rotation={[0, deg2rad(90), 0]}
          args={[110, 10, 1]}
        />
        <Line
          position={[-20, 5, -110]}
          rotation={[0, deg2rad(90), 0]}
          args={[1, 10, 100]}
        />
        <Line
          position={[82, 5, -83]}
          rotation={[0, deg2rad(45), 0]}
          args={[1, 10, 50]}
        />
        <group name="낚시터">
          <Line
            position={[148, 5, -39]}
            rotation={[0, 0, 0]}
            args={[1, 10, 10]}
          />
          <Line
            position={[148, 5, -54.5]}
            rotation={[0, 0, 0]}
            args={[1, 10, 5]}
          />
          <Line
            position={[153, 5, -45.5]}
            rotation={[0, deg2rad(90), 0]}
            args={[1, 10, 7]}
          />
          <Line
            position={[153, 5, -52]}
            rotation={[0, deg2rad(90), 0]}
            args={[1, 10, 7]}
          />
          <Line
            position={[158, 5, -49]}
            rotation={[0, 0, 0]}
            args={[1, 10, 5]}
          />
        </group>
      </group>
    </group>
  );
};

export default Environment;
