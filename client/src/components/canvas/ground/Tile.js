import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { Color, TextureLoader } from "three";
import Corn from "../../models/Corn";
import Tomato from "../../models/Tomato";

const Tile = ({ indexX, indexY, num }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [demo, setDemo] = useState(false);
  const demoArr = [<Tomato demo={demo} />, <Corn demo={demo} />];
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

  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[-26.5 + indexX * 5.1, 0, -22]}
      onPointerOver={(e) => {
        setSelect(new Color(2, 2, 2));
      }}
      onPointerOut={(e) => {
        setSelect(new Color(1, 1, 1));
      }}
      // onClick={(e) => {
      //   const { x, y, z } = e.object.position;
      //   setDemo(true);
      // }}
    >
      <planeGeometry attach="geometry" args={[5, 5]} />
      <meshPhysicalMaterial
        map={textureStarField1}
        opacity={1}
        attach="material"
        color={select}
        transparent
      />
      {demo ? demoArr[num] : null}
    </mesh>
  );
};

export default React.memo(Tile);
