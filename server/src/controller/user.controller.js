import { tokenValidation } from "../middleware/validation";
import { userInfo, userPfp } from "../db_Process/user.db";

const getMyinfo = async (req, res, next) => {
  const { user_id, address } = req.body;
  const dbResult = await userInfo(user_id, address);

  console.log(dbResult);
  if (dbResult) {
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({
      message: "내 정보를 불러오는데 실패했어..(아이디또는계정을확인바람)",
    });
  }
};

const updatePfp = async (req, res, next) => {
  const { address, image } = req.body;
  const dbResult = await userPfp(address, image);
  if (dbResult) {
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({
      message: "실패",
    });
  }
};

export { getMyinfo, updatePfp };
