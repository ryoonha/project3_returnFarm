import React from "react";
import { useSelector } from "react-redux";
import { Girl } from "./Girl";
import { Man } from "./Man";

const Character = () => {
  const { myInfo } = useSelector((state) => state.user);
  return (
    <group>
      {/* <Man nickName={myInfo.nickName} /> */}
      <Girl nickName={myInfo.nickName} />
    </group>
  );
};

export default Character;
