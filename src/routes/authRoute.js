const {
  handleLoginOrRegister,
  verifyLoginOrRegister,
} = require("../controllers/authController");
const authRouter = require("express").Router();

authRouter.post("/loginOrRegister", handleLoginOrRegister);
authRouter.post("/verify", verifyLoginOrRegister);

module.exports = authRouter;
