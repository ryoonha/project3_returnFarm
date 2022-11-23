import React from "react";
import { rockArr, treeArr } from "../../models/environment";
import { PineTree } from "../../models/PineTree";

const Environment = () => {
  const getdirect = () => Math.floor(Math.random() * 2);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const treeNumArr = Array(90).fill(false);
  const rockNumArr = Array(50).fill(false);
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
          {rockArr[index % 8]}
        </group>
      ))}
      {/* {treeArr.map((data, index) => (
        <PineTree
          key={`tree${index}`}
          position={
            getdirect() === 1
              ? getdirect() === 1
                ? [getRandom(-50, -30), 0, getRandom(-50, 50)]
                : [getRandom(50, 30), 0, getRandom(-50, 50)]
              : getdirect() === 1
              ? [getRandom(-50, 50), 0, getRandom(-50, -30)]
              : [getRandom(-50, 50), 0, getRandom(50, 30)]
          }
          rotation={[0, Math.floor(Math.random() * 5), 0]}
        />
      ))} */}
      {/* <Grass /> */}
    </group>
  );
};

export default Environment;
