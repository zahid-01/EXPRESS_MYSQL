const pool = require("../Config/database");

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;
  const query = `SELECT EXISTS(SELECT 1 FROM clients WHERE email = '${email}') AS userExists`;

  pool.query(query, (err, rows, fields) => {
    if (rows[0].userExists) {
      console.log("User Exists");
    } else {
      console.log("User does not exists");
    }
    res.status(200).json({
      rows,
    });
  });
};
