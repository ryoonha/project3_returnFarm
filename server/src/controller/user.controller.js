import * as db from "../db_Process/user.js";
import { tokenValidation } from "../middleware/validation";
import User from "../../models/user";

/** 확인하려는 유저
 * user_id: choppa
 * user_pwd: lalala
 * user_nick: 츤데레
 * address: 0xbd20686940933b4Ca4aC5C65a3A8d38d3f817a41
 * jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg2NDc5MTgsImV4cCI6MTY2ODY1ODcxOH0.CWX87z5Hbdaz29nefGGSX_idX7HA0KmKu0mTe-AhTok
 */

// user_id, address 맞다면, db_process의 userInfo 함수 실행

export const getMyinfo = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  console.log(req.body, "🔎");

  // const myInfo = db.userInfo(tokenData.address);
  const myInfo = await User.findOne({ where: { user_id: req.body.user_id } });
  // console.log(myInfo, "🍋");

  // 토큰에 데이터가 있고 DB에서 유저 조회가 성공적이라면
  if (myInfo) {
    // && tokenData
    res.status(200).send(myInfo);
  } else {
    res.status(400).send({ message: "내 정보를 불러오는데 실패했어.." });
  }
};
