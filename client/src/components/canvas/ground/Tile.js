import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { Color, TextureLoader } from "three";
import { handleTile } from "../../../stores/reducers/stateSlice";

const Tile = ({ tileData, numX, numZ }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const textureStarField1 = useMemo(
    () =>
      new TextureLoader().load(
        process.env.PUBLIC_URL + "/images/ground/tile.png"
      ),
    []
  );

  // textureStarField1.repeat.set(2, 2);
  textureStarField1.repeat.x = 2;
  textureStarField1.repeat.y = 2;
  textureStarField1.wrapS = THREE.RepeatWrapping;
  textureStarField1.wrapT = THREE.RepeatWrapping;
  //textureStarField1.repeat.set(1, 1);
  // console.log(tileData);
  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[24 - numX * 5.1, 0, 24 - numZ * 5.1]}
      onPointerOver={(e) => {
        setSelect(new Color(2, 2, 2));
      }}
      onPointerOut={(e) => {
        setSelect(new Color(1, 1, 1));
      }}
      onClick={(e) => {
        const { x, y, z } = e.object.position;
        console.log(e.object.position);
        dispatch(
          handleTile({
            x: Math.floor(x * 100) / 100,
            z: Math.floor(z * 100) / 100,
            data: tileData,
          })
        );
      }}
    >
      <planeGeometry attach="geometry" args={[5, 5]} />
      <meshPhysicalMaterial
        map={textureStarField1}
        opacity={1}
        attach="material"
        color={select}
        transparent
      />
    </mesh>
  );
};

export default React.memo(Tile);
