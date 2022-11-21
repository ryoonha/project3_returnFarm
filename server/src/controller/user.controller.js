import { tokenValidation } from "../middleware/validation";
import { userInfo } from "../db_Process/user.db";

export const getMyinfo = async (req, res, next) => {
  const { user_id, address } = req.body;
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  const dbResult = await userInfo(user_id, address);

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

export { getMyinfo };
