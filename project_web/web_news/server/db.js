import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "web_news",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

// Attempt to connect and provide clearer logging for remote deployments
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected!");
  }
});

// Reconnect on fatal errors (basic handling)
db.on('error', (err) => {
  console.error('MySQL connection error:', err);
  // Depending on environment you might want to attempt reconnect here
});