import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

//buffer 형태로 저장
const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
