import {
  accessToken,
  tokenValidation,
  generateRefresh,
} from "../middleware/validation";
import User from "../../models/user";
import { userInfo } from "../db_Process/user.db";

/** 확인하려는 유저
 * user_id: choppa
 * user_pwd: lalala
 * user_nick: 츤데레
 * address: 0xbd20686940933b4Ca4aC5C65a3A8d38d3f817a41
 * jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Njg2NDc5MTgsImV4cCI6MTY2ODY1ODcxOH0.CWX87z5Hbdaz29nefGGSX_idX7HA0KmKu0mTe-AhTok
 */

// user_id, address 맞다면, db_process의 userInfo 함수 실행

export const getMyinfo = async (req, res, next) => {
  const { user_id, address } = req.body;
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  const dbResult = await db.userInfo(user_id, address);

  // 토큰에 데이터가 있고 DB에서 유저 조회가 성공적이라면
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({
      message: "내 정보를 불러오는데 실패했어..(아이디또는계정을확인바람)",
    });
  }
};
