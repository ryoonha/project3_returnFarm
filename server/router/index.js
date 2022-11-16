const router = require("express").Router();

const sign = require("./sign");
const user = require("./user");
const transaction = require("./transction");

router.use("/sign", sign);
router.use("/user", user);
router.use("/transaction", transaction);

module.exports = router;
