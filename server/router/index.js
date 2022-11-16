import { Router } from "express";

import sign from "./sign";
import user from "./user";
import transaction from "./transction";
import game from "./game";

Router.use("/sign", sign);
Router.use("/user", user);
Router.use("/transaction", transaction);
Router.use("/game", game);

module.exports = Router;
