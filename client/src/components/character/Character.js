import React from "react";
import { useSelector } from "react-redux";
import { Man } from "./Man";

const Character = () => {
  const { userTest } = useSelector((state) => state.state);
  return (
    <group>
      <Man nickName={userTest} />
    </group>
  );
};

export default Character;
