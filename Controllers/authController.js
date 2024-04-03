const createDatabaseAndTableIfNotExists = require("../Config/createDB");
const poolMaster = require("../Config/database");
const { google } = require("googleapis");

const sendResponse = (res, status, message, rows = null) => {
  res.status(status).json({
    message,
    rows: rows || null,
  });
};

//Create
const createOrganisation = (creds) => {
  const pool = poolMaster();
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

//Signup
exports.signup = async (req, res) => {
  const { email, password, username, organisationName } = req.body;
  const query = `SELECT EXISTS(SELECT 1 FROM clients WHERE email = '${email}') AS userExists`;
  const pool = poolMaster();
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

//Login
exports.login = async (req, res, next) => {
  const baseUri = "https://accounts.google.com/o/oauth2/auth";
  const options = {
    redirect_uri: "http://localhost:8000/api/v1/auth/google/oauth",
    client_id: process.env.CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const quer = new URLSearchParams(options);

  const uri = `${baseUri}?${quer.toString()}`;
  res.status(200).json({
    message: "OAuth",
    uri,
  });
};

//OAuth Callback
exports.callbackOAuth = async (req, res) => {
  console.log(req.query);

  res.status(200).json({ message: "HI" });
};

//Protect
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
