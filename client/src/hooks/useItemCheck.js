import React from "react";
import { useSelector } from "react-redux";

const useItemCheck = () => {
  let item = useSelector((state) => state.game.selectItem);
  console.log(item);
};

export default useItemCheck;
