require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");

let ssl;
if (process.env.DB_SSL === "true") {
  ssl = { minVersion: "TLSv1.2" };
  if (process.env.DB_SSL_CA) {
    ssl.ca = process.env.DB_SSL_CA.replace(/\\n/g, "\n");
  }
  if (process.env.DB_SSL_CA_PATH) {
    try {
      ssl.ca = fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8");
    } catch (e) {
      console.error("Failed to read CA file:", e.message);
    }
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
