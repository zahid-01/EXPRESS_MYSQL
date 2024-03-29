const AuthRouter = require("express").Router();

const { signup } = require("../Controllers/authController");


AuthRouter.post("/signup", signup);

module.exports = AuthRouter;