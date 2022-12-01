import { usePlane } from "@react-three/cannon";
import React from "react";
import { useSelector } from "react-redux";
import Tile from "./Tile";

const Ground = () => {
  const tileArr = useSelector((state) => state.user.tile);
  const num = Math.sqrt(tileArr.length);

  const Plane = (props) => {
    const [ref] = usePlane(() => ({
      type: "Static",
      //material: "ground",
      args: [500, 500],
      ...props,
    }));

    return (
      <group ref={ref}>
        <mesh receiveShadow>
          <planeGeometry args={[250, 250]} />
          <meshStandardMaterial color={props.bgColor} />
        </mesh>
      </group>
    );
  };

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
      <Plane
        position={[0, -0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        bgColor={"#90c57c"}
      />
    </group>
  );
};

export default Ground;
