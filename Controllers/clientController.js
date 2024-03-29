const pool = require("../Config/database");

const sendResponse = (res, status, message, rows = null) => {
  res.status(status).json({
    message,
    rows: rows || null,
  });
};

//Create
exports.createUser = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password)
    return res.status(200).json({
      message: "Provide all the details",
    });

  const query = `INSERT INTO clients (username,email, password) VALUES (?,?,?)`;
  const result = pool.query(
    query,
    [username, email, password],
    (err, rows, fields) => {
      sendResponse(res, 200, "User Created", rows);
    }
  );
};

//READ all users
exports.getAllUsers = async (req, res) => {
  const query = `select * from clients`;
  let result;
  pool.query(query, (err, rows, fields) => {
    sendResponse(res, 200, { count: rows.length }, rows);
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
    sendResponse(res, 200, "User updated", rows);
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
    sendResponse(res, 200, "User deleted", rows);
  });
};
