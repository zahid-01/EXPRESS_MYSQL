const mysql = require("mysql2");

exports.getPool = (dbname) => {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "helloworld",
    database: dbname,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  return pool;
};
