import React from "react";
import { Man } from "./Man";
import { Woman } from "./Woman";
import { Xbot } from "./Xbot";
import { Ybot } from "./Ybot";

const User = ({ data, userTest }) => {
  const { characterSelect } = data;
  console.log(data);
  return (
    <group>
      {characterSelect === "man" ? (
        <Man data={data} userTest={userTest} />
      ) : null}
      {characterSelect === "woman" ? (
        <Woman data={data} userTest={userTest} />
      ) : null}
      {characterSelect === "Xbot" ? (
        <Xbot data={data} userTest={userTest} />
      ) : null}
      {characterSelect === "Ybot" ? (
        <Ybot data={data} userTest={userTest} />
      ) : null}
    </group>
  );
};

export default User;
