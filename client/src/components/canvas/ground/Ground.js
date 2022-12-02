import { RigidBody } from "@react-three/rapier";
import React from "react";
import { useSelector } from "react-redux";
import Tile from "./Tile";

const Ground = () => {
  const tileArr = useSelector((state) => state.user.tile);
  const num = Math.sqrt(tileArr.length);

  return (
    <group position={[0, 0, 0]}>
      {tileArr.map((tileData, index) => (
        <Tile
          key={index}
          tileData={tileData}
          numX={index % num}
          numZ={Math.floor(index / num)}
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
