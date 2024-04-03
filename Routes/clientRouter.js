const ClientRouter = require("express").Router();

const { protect } = require("../Controllers/authController");
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

ClientRouter.use(protect);
ClientRouter.route("/client").post(clientSignup);
module.exports = ClientRouter;
