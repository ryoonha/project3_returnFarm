import React from "react";
import { useSelector } from "react-redux";
import Tile from "./Tile";

const Ground = () => {
  const tileArr = useSelector((state) => state.user.tile);
  console.log(tileArr);

  return (
    <group position={[0, -1, 0]}>
      {tileArr.map((tileData, index) => (
        <Tile
          key={index}
          tileData={tileData}
          numX={index % 10}
          numZ={Math.floor(index / 10)}
        />
      ))}
    </group>
  );
};

export default Ground;
