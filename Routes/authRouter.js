const AuthRouter = require("express").Router();

const { signup, login } = require("../Controllers/authController");

AuthRouter.post("/oauth", login);
AuthRouter.post("/signup", signup);

module.exports = AuthRouter;
