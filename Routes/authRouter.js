const AuthRouter = require("express").Router();

const {
  signup,
  login,
  callbackOAuth,
} = require("../Controllers/authController");

AuthRouter.route("/oauth").post(login).get(callbackOAuth);
AuthRouter.post("/signup", signup);

module.exports = AuthRouter;
