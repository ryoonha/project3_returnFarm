import { Cloud } from "@react-three/drei";
import React from "react";
import {
  rockArr,
  treeArr,
  grassArr,
  flowreArr,
} from "../../models/environment";

const Environment = () => {
  const getdirect = () => Math.floor(Math.random() * 2);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const treeNumArr = Array(150).fill(false);
  const rockNumArr = Array(80).fill(false);
  const grassNumArr = Array(500).fill(false);
  const flowreNumArr = Array(300).fill(false);
  const cloudNumArr = Array(10).fill(false);
  return (
    <group>
      {treeNumArr.map((_, index) => (
        <group
          key={index}
          position={
            getdirect() === 1
              ? getdirect() === 1
                ? [getRandom(-120, -30), 0, getRandom(-120, 120)]
                : [getRandom(120, 30), 0, getRandom(-120, 120)]
              : getdirect() === 1
              ? [getRandom(-120, 120), 0, getRandom(-120, -30)]
              : [getRandom(-120, 120), 0, getRandom(120, 30)]
          }
          rotation={[0, Math.floor(Math.random() * 5), 0]}
          scale={10}
        >
          {treeArr[index % 8]}
        </group>
      ))}
      {rockNumArr.map((_, index) => (
        <group
          key={index}
          position={
            getdirect() === 1
              ? getdirect() === 1
                ? [getRandom(-120, -30), 0, getRandom(-120, 120)]
                : [getRandom(120, 30), 0, getRandom(-120, 120)]
              : getdirect() === 1
              ? [getRandom(-120, 120), 0, getRandom(-120, -30)]
              : [getRandom(-120, 120), 0, getRandom(120, 30)]
          }
          rotation={[0, Math.floor(Math.random() * 5), 0]}
          scale={2}
        >
          {rockArr[index % 5]}
        </group>
      ))}
      {grassNumArr.map((_, index) => (
        <group
          key={index}
          position={
            getdirect() === 1
              ? getdirect() === 1
                ? [getRandom(-120, -30), 0, getRandom(-120, 120)]
                : [getRandom(120, 30), 0, getRandom(-120, 120)]
              : getdirect() === 1
              ? [getRandom(-120, 120), 0, getRandom(-120, -30)]
              : [getRandom(-120, 120), 0, getRandom(120, 30)]
          }
          rotation={[0, Math.floor(Math.random() * 5), 0]}
          scale={0.05}
        >
          {grassArr[index % 3]}
        </group>
      ))}
      {flowreNumArr.map((_, index) => (
        <group
          key={index}
          position={
            getdirect() === 1
              ? getdirect() === 1
                ? [getRandom(-120, -30), 0, getRandom(-120, 120)]
                : [getRandom(120, 30), 0, getRandom(-120, 120)]
              : getdirect() === 1
              ? [getRandom(-120, 120), 0, getRandom(-120, -30)]
              : [getRandom(-120, 120), 0, getRandom(120, 30)]
          }
          rotation={[0, Math.floor(Math.random() * 5), 0]}
          scale={5}
        >
          {flowreArr[index % 2]}
        </group>
      ))}
      {cloudNumArr.map((_, index) => (
        <Cloud
          // castShadow
          speed={1}
          depth={3}
          width={10}
          key={index}
          color="white"
          position={
            getdirect() === 1
              ? [getRandom(-120, 120), 80, getRandom(-120, 120)]
              : [getRandom(120, -120), 80, getRandom(120, -120)]
          }
          scale={2}
        />
      ))}
    </group>
  );
};

export default Environment;
