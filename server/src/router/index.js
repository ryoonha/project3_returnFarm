import express from "express";

const router = express.Router();

import sign from "./sign";
import user from "./user";
import transaction from "./transaction";
import game from "./game";
import nft from "./nft";

router.use("/sign", sign);
router.use("/user", user);
router.use("/transaction", transaction);
router.use("/game", game);
router.use("/nft", nft);

export default router;
