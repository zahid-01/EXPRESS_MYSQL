const ClientRouter = require("express").Router();

const { createUser, getAllUsers } = require("../Controllers/clientController");

ClientRouter.route("/").post(createUser).get(getAllUsers);

module.exports = ClientRouter;
