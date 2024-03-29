const ClientRouter = require("express").Router();

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/clientController");

ClientRouter.route("/")
  .post(createUser)
  .get(getAllUsers)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = ClientRouter;
