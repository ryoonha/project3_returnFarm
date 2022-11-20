import React from "react";
import { useSelector } from "react-redux";
import { Man } from "./Man";

const Character = () => {
  const { myInfo } = useSelector((state) => state.state);
  return (
    <group>
      <Man nickName={myInfo.nickName} />
    </group>
  );
};

export default Character;
