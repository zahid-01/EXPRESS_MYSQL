const express = require("express");
const morgan = require("morgan");

const app = express();

const ClientRouter = require("./Routes/clientRouter");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", ClientRouter);

module.exports = app;
