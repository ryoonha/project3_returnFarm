import express from "express";

const router = express.Router();

import sign from "./sign.router";
import user from "./user.router";
import transaction from "./transaction.router";
import game from "./game.router";
import nft from "./nft.router";

router.use("/sign", sign);
router.use("/user", user);
router.use("/transaction", transaction);
router.use("/game", game);
router.use("/nft", nft);

export default router;
