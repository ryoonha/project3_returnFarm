import { RigidBody } from "@react-three/rapier";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import handleSound from "../../../data/sounds/sound";
import { tileUpdate } from "../../../stores/reducers/userSlice";
import Tile from "./Tile";

const Ground = () => {
  const dispatch = useDispatch();
  const tileArr = useSelector((state) => state.user.tile);
  const num = Math.sqrt(tileArr.length);
  const [itemNum, itemName] = useSelector((state) => state.game.selectItem);
  const eventLock = useSelector((state) => state.state.eventLock);

  const handleClick = (data, tileIndex) => {
    if (!eventLock) {
      handleSound("action");
      if (data.status === null && itemName.includes("씨앗")) {
        const timeDate = new Date().toLocaleDateString().slice(0, -1);
        dispatch(
          tileUpdate({
            tile: { newData: itemName, index: tileIndex, timeDate },
          })
        );
      } else if (itemName === "삽") {
        dispatch(
          tileUpdate({
            tile: { newData: null, index: tileIndex, timeDate: null },
          })
        );
      }
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
          handleClick={handleClick}
        />
      ))}
      <RigidBody colliders="hull" type="fixed">
        <group position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh receiveShadow>
            <planeGeometry args={[250, 250]} />
            <meshStandardMaterial color={"#90c57c"} />
          </mesh>
        </group>
      </RigidBody>
    </group>
  );
};

export default Ground;
