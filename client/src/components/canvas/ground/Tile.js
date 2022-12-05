import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Color, TextureLoader } from "three";
import { handleTile } from "../../../stores/reducers/stateSlice";
import {
  flowreArr,
  grassArr,
  rockArr,
  treeArr,
} from "../../models/environment";
import { Seed } from "../../models/plant/Seed";
import Tomato from "../../models/plant/Tomato";

const Tile = ({ tileData, numX, numZ, index, handleClick }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [{ type, scale, seed }, setData] = useState({
    type: null,
    scale: null,
    seed: false,
  });
  // const textureStarField1 = useMemo(
  //   () =>
  //     new TextureLoader().load(
  //       process.env.PUBLIC_URL + "/images/ground/tile.png"
  //     ),
  //   []
  // );
  useEffect(() => {
    if (tileData.status) {
      const [name, num] = tileData.status.split(/_/g);
      const check = tileData.status.includes("씨앗");
      if (name === "나무") {
        setData({ type: treeArr[num - 1], scale: 10, seed: false });
      } else if (name === "돌") {
        setData({ type: rockArr[num - 1], scale: 2, seed: false });
      } else if (name === "잡초") {
        setData({ type: grassArr[num - 1], scale: 0.05, seed: false });
      } else if (name === "꽃") {
        setData({ type: flowreArr[num - 1], scale: 5, seed: false });
      } else if (check) {
        // 테스트 조건
        if (tileData.estimated_time === "2022. 12. 5") {
          setData({ type: <Tomato />, scale: 0.5, seed: true });
        } else {
          setData({ type: <Seed />, scale: 0.02, seed: true });
        }
      }
    } else {
      setData({ type: null, scale: null, seed: false });
    }
  }, [tileData]);

  // textureStarField1.repeat.x = 2;
  // textureStarField1.repeat.y = 2;
  // textureStarField1.wrapS = THREE.RepeatWrapping;
  // textureStarField1.wrapT = THREE.RepeatWrapping;
  //textureStarField1.repeat.set(1, 1);

  return (
    <mesh
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[72 - numX * 5.1, 0, 72 - numZ * 5.1]}
      onPointerOver={(e) => {
        setSelect(new Color(255, 255, 255));
      }}
      onPointerOut={(e) => {
        setSelect(new Color(1, 1, 1));
      }}
      onClick={() => {
        handleClick(tileData, index);
      }}
      onContextMenu={(e) => {
        const { x, y, z } = e.object.position;
        dispatch(
          handleTile({
            x: Math.floor(x * 100) / 100,
            z: Math.floor(z * 100) / 100,
            data: tileData,
            seed,
            index,
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
