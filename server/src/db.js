require("dotenv").config();
const mysql = require("mysql2/promise");

let ssl;
if (process.env.DB_SSL === "true") {
  ssl = { minVersion: "TLSv1.2" };
  if (process.env.DB_SSL_CA) {
    ssl.ca = process.env.DB_SSL_CA.replace(/\\n/g, "\n");
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "game",
  waitForConnections: true,
  connectionLimit: 10,
  ssl,
});

module.exports = { pool };
