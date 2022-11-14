import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../libs/socketio";
import { User } from "./User";

const Character = () => {
  const { characterList, userList } = useSelector((state) => state.socket);
  console.log(characterList);
  console.log(userList);

  useEffect(() => {
    socket.on("join_user", (data) => {
      console.log(data);
      // dispatch(handleChat({ chatArray: data }));
    });
  }, [socket]);
  //socket.emit
  return (
    <group>
      {characterList.map((data, index) => (
        <User key={index} data={data} userId={userList[index]} />
      ))}
    </group>
  );
};

export default Character;
