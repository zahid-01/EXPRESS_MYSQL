const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "helloworld",
  database: "organisations",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the MySQL Server");
});

//Create
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(200).json({
      message: "Provide all the details",
    });

  const query = `INSERT INTO clients (email, password) VALUES (?,?)`;
  const result = await db.execute(query, [email, password]);

  res.status(200).json({
    result,
  });
};

//READ all users
exports.getAllUsers = async (req, res) => {
  const query = `select email from clients where email = 'zahid@sudo.com';
  `;
  const result = await db.execute(query);

  res.status(200).json({
    result,
  });
};
