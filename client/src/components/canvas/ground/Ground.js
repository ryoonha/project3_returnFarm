import { RigidBody } from "@react-three/rapier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tileUpdate } from "../../../stores/reducers/userSlice";
import Tile from "./Tile";

const Ground = () => {
  const dispatch = useDispatch();
  const tileArr = useSelector((state) => state.user.tile);
  const num = Math.sqrt(tileArr.length);
  const item = useSelector((state) => state.game.selectItem);

  const handleSeed = (data, index) => {
    if (data.status === null && item[1].includes("씨앗")) {
      const timeDate = new Date().toLocaleDateString().slice(0, -1);
      dispatch(
        tileUpdate({
          tile: { newData: item[1], index: index, timeDate },
        })
      );
    }
  };
  return (
    <group position={[0, 0, 0]}>
      {tileArr.map((tileData, index) => (
        <Tile
          key={index}
          tileData={tileData}
          numX={index % num}
          numZ={Math.floor(index / num)}
          index={index}
          handleSeed={handleSeed}
        />
      ))}
      <group position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[250, 250]} />
          <meshStandardMaterial color={"#90c57c"} />
        </mesh>
      </group>
    </group>
  );
};

export default Ground;
