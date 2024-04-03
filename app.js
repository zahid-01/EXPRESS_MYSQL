const express = require("express");
const morgan = require("morgan");

const app = express();

const ClientRouter = require("./Routes/clientRouter");
const AuthRouter = require("./Routes/authRouter");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", ClientRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/auth/google", AuthRouter);

module.exports = app;
