const app = require("./app");
const env = require("dotenv").config({ path: "./.env" });

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
