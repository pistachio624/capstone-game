const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { pool } = require("./db");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/dbcheck", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1+1 AS ok");
    res.json({ ok: rows[0]?.ok === 2 });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
