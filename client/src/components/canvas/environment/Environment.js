import React, { useRef } from "react";
import { Mountain } from "../../models/environment/Mountain";
import { Cloud } from "../../models/environment/Cloud";
import { SmallMountain2 } from "../../models/environment/SmallMountain2";
import { SmallMountain } from "../../models/environment/SmallMountain";
import { useFrame } from "@react-three/fiber";

const Environment = () => {
  const cloudRef = useRef();
  const getdirect = () => Math.floor(Math.random() * 2);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const cloudNumArr = Array(30).fill(false);
  const deg2rad = (degrees) => degrees * (Math.PI / 180);

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
    </group>
  );
};

export default Environment;
