import express from "express";
import * as db from "../db_Process/user";
import { tokenValidation } from "../middleware/validation";

/** 확인하려는 유저
 * user_id: choppa
 * user_pwd: lalala
 * user_nick: 츤데레
 * address: 0xbd20686940933b4Ca4aC5C65a3A8d38d3f817a41
 * jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg2NDc5MTgsImV4cCI6MTY2ODY1ODcxOH0.CWX87z5Hbdaz29nefGGSX_idX7HA0KmKu0mTe-AhTok
 */

// user_id, user_pwd가 맞다면, db_process의 userInfo 함수 실행

export const searchMyInfo = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기

  // 토큰에 데이터가 있고 DB에서 가방 조회가 성공적이라면
  const { user_id, address } = req.body;
  console.log(req.body, "🫐");
  //    {
  //   user_id: 'nami',
  //   address: '0xbd20686940933b4Ca4aC5C65a3A8d38d3f817a41'
  // } 🫐

  const myInfo = await db.userInfo(user_id, address);
  console.log(myInfo), "🍊";
  if (myInfo) {
    res.status(200).send(myInfo);
    console.log(db.userInfo(myInfo, "🪪"));
  } else {
    res.status(400).send({ message: "네 정보 여기 없다.." });
  }
};
