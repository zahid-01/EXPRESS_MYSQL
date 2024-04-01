const ClientRouter = require("express").Router();

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  clientSignup,
} = require("../Controllers/clientController");

ClientRouter.route("/")
  .post(createUser)
  .get(getAllUsers)
  .patch(updateUser)
  .delete(deleteUser);

ClientRouter.route("/client").post(clientSignup);
module.exports = ClientRouter;
