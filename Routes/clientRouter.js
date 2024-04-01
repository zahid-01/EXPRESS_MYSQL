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

ClientRouter.route("/client").post(protect, clientSignup);
module.exports = ClientRouter;
