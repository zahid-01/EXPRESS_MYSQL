const createDatabaseAndTableIfNotExists = require("../Config/createDB");
const pool = require("../Config/database");
const { getPool } = require("../Config/clientDb");

exports.signup = async (req, res) => {
  const { email, password, username, organisationName } = req.body;
  const query = `SELECT EXISTS(SELECT 1 FROM clients WHERE email = '${email}') AS userExists`;

  pool.query(query, (err, rows, fields) => {
    if (rows[0].userExists) {
      console.log("User Exists");
    } else {
      createDatabaseAndTableIfNotExists(email.split("@")[0]);
      const query = `INSERT INTO clients (username,email, password,organisationName) VALUES (?,?,?,?)`;
      pool.query(
        query,
        [email, password, username, organisationName],
        (err, rows, fields) => {
          res.status(200).json({
            rows,
          });
        }
      );
    }
  });
};
