const pool = require("../Config/database");

//Create
exports.createUser = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password)
    return res.status(200).json({
      message: "Provide all the details",
    });

  const query = `INSERT INTO clients (username,email, password) VALUES (?,?,?)`;
  const result = pool.query(query, [username, email, password]);

  res.status(200).json({
    result,
  });
};

//READ all users
exports.getAllUsers = async (req, res) => {
  const query = `select * from clients`;
  let result;
  pool.query(query, (err, rows, fields) => {
    result = rows;
    res.status(200).json({
      result,
    });
  });
};

//Update User
exports.updateUser = async (req, res) => {
  const { newUsername, email } = req.body;
  const query = `UPDATE clients SET username = '${newUsername}' WHERE email = '${email}'`;

  pool.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      rows,
    });
  });
};

//Delete User
exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  const query = `DELETE FROM clients WHERE email = '${email}'`;

  pool.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      rows,
    });
  });
};
