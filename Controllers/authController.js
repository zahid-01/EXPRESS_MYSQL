const createDatabaseAndTableIfNotExists = require("../Config/createDB");
const pool = require("../Config/database");
const { getPool } = require("../Config/clientDb");

const sendResponse = (res, status, message, rows = null) => {
  res.status(status).json({
    message,
    rows: rows || null,
  });
};

//Create
const createOrganisation = (creds) => {
  const { email, password, username, organisationName } = creds;
  console.log(username, email, password, organisationName);
  const query = `INSERT INTO clients (username,email, password,organisationName, isSubscribed) VALUES (?,?,?,?,?)`;
  pool.query(
    query,
    [username, email, password, organisationName, 1],
    (err, rows, fields) => {
      if (err) console.log(err);
      console.log("Mater DB ORG updated!");
    }
  );
};

exports.signup = async (req, res) => {
  const { email, password, username, organisationName } = req.body;
  const query = `SELECT EXISTS(SELECT 1 FROM clients WHERE email = '${email}') AS userExists`;

  pool.query(query, (err, rows, fields) => {
    if (rows && rows[0].userExists) {
      sendResponse(res, 403, "Organisation Exists");
    } else {
      createOrganisation({ email, password, username, organisationName });
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

exports.protect = (req, res, next) => {
  const { orgName } = req.body;

  const query = `SELECT isSubscribed from clients where username='${orgName}'`;

  pool.query(query, (err, rows) => {
    const isSubscribed = rows[0].isSubscribed;
    if (isSubscribed) return next();

    res.status(200).json({
      message: "Your trial has expired, get a plan now!",
    });
  });
};
