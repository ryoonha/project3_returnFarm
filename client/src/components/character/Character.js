import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../libs/socketio";
import { handleCharacter } from "../../stores/reducers/socketSlice";
import User from "./User";

const Character = () => {
  const dispatch = useDispatch();
  const { characterList, userList } = useSelector((state) => state.socket);
  console.log(characterList);
  console.log(userList);

  // 새로 코드 작성하기
  const { userTest } = useSelector((state) => state.state);

  useEffect(() => {
    socket.on("join_user", (data) => {
      dispatch(handleCharacter({ characterData: [...characterList, data] }));
    });
  }, [socket]);

  //socket.emit
  return (
    <group>
      {characterList.map((data, index) => (
        <User data={data} userTest={userTest} key={index} />
      ))}
    </group>
  );
};

export default Character;
