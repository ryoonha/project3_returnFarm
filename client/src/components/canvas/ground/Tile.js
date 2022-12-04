import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import { Color, TextureLoader } from "three";
import useItemCheck from "../../../hooks/useItemCheck";
import { handleTile } from "../../../stores/reducers/stateSlice";
import {
  flowreArr,
  grassArr,
  rockArr,
  treeArr,
} from "../../models/environment";

const Tile = ({ tileData, numX, numZ, index }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const textureStarField1 = useMemo(
    () =>
      new TextureLoader().load(
        process.env.PUBLIC_URL + "/images/ground/tile.png"
      ),
    []
  );

  let type = null;
  let scale = null;
  if (tileData.status) {
    const [name, num] = tileData.status.split(/_/g);
    if (name === "나무") {
      type = treeArr[num - 1];
      scale = 10;
    } else if (name === "돌") {
      type = rockArr[num - 1];
      scale = 2;
    } else if (name === "잡초") {
      type = grassArr[num - 1];
      scale = 0.05;
    } else if (name === "꽃") {
      type = flowreArr[num - 1];
      scale = 5;
    }
  }

  // textureStarField1.repeat.set(2, 2);
  textureStarField1.repeat.x = 2;
  textureStarField1.repeat.y = 2;
  textureStarField1.wrapS = THREE.RepeatWrapping;
  textureStarField1.wrapT = THREE.RepeatWrapping;
  //textureStarField1.repeat.set(1, 1);
  // console.log(tileData);
  return (
    <mesh
      index={index}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[72 - numX * 5.1, 0, 72 - numZ * 5.1]}
      onPointerOver={(e) => {
        setSelect(new Color(2, 2, 2));
      }}
      onPointerOut={(e) => {
        setSelect(new Color(1, 1, 1));
      }}
      onClick={(e) => {
        // console.log(e);
        const { x, y, z } = e.object.position;
        dispatch(
          handleTile({
            x: Math.floor(x * 100) / 100,
            z: Math.floor(z * 100) / 100,
            data: tileData,
          })
        );
      }}
    >
      {type ? (
        <group rotation={[Math.PI / 2, 0, 0]} scale={scale}>
          {type}
        </group>
      ) : null}
      {/* <Rand
        scale={0.2}
        position={[0, 0, -0.4]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <SandLand position={[-100, 0, -120]} /> */}
      <planeGeometry attach="geometry" args={[5, 5]} />
      <meshBasicMaterial
        //map={textureStarField1}
        opacity={0.3}
        attach="material"
        color={select}
        transparent
      />
    </mesh>
  );
};

export default React.memo(Tile);
