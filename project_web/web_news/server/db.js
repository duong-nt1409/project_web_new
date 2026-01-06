import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Sử dụng createPool thay vì createConnection
export const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "web_news",
  port: process.env.DB_PORT || 3306, // Lưu ý: Cloud thường dùng 3306 hoặc port riêng, ít khi dùng 3307 như XAMPP
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Cấu hình SSL: Bắt buộc đối với nhiều Cloud Database (như Aiven, Azure...)
  // Nếu vẫn lỗi kết nối, hãy thử bỏ comment dòng ssl bên dưới:
  // ssl: { rejectUnauthorized: false } 
});

// Kiểm tra kết nối ban đầu
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL:", err);
  } else {
    console.log("✅ Đã kết nối MySQL thành công!");
    connection.release(); // Trả kết nối về pool ngay sau khi test xong
  }
});