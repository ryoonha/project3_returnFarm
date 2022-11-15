import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keyDownE, keyUpE } from "../../stores/reducers/characterSlice";

const Control = () => {
  const dispatch = useDispatch();
  const keySet = {
    w: "up",
    d: "right",
    s: "down",
    a: "left",
  };
  const handleKeyDown = (key) => {
    if (key === "w" || key === "d" || key === "s" || key === "a") {
      dispatch(keyDownE({ key: keySet[key] }));
    }
  };
  const handleKeyUp = (key) => {
    if (key === "w" || key === "d" || key === "s" || key === "a") {
      dispatch(keyUpE({ key: keySet[key] }));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => handleKeyDown(e.key));
    document.addEventListener("keyup", (e) => handleKeyUp(e.key));
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleKeyUp);
    };
  }, []);
};

export default Control;
