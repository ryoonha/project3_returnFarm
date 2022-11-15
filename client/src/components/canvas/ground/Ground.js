import React from "react";
import { useSelector } from "react-redux";
import Tile from "./Tile";
//import { focusGround } from "../store/reducers/groundSlice";

const Ground = () => {
  let arr = Array(10).fill(0);

  return (
    <group position={[0, -1, 0]}>
      {arr.map((e, indexY) => (
        <group key={"col" + indexY} position={[0, 0, -4.5 + indexY * 5.1]}>
          {arr.map((e, indexX) => (
            <Tile
              key={"row" + indexX}
              indexX={indexX}
              indexY={indexY}
              num={Math.floor(Math.random() * 2)}
            />
          ))}
        </group>
      ))}
    </group>
  );
};

export default Ground;
