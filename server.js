const app = require("./app");
const env = require("dotenv").config({ path: "./.env" });

app.listen(6000, () => {
  console.log("Server started");
});
