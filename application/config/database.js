const mysql = require("mysql2");

const pool = mysql.createPool({
  // connectionLimit: 50,
  host: "18.116.158.31",
  user: "teamproject",
  password: "user675!",
  database: "project",
});

const promisePool = pool.promise();
module.exports = promisePool;
