const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. 連線資料庫
connectDB();

// 2. 基礎設定 (讓它可以讀懂 JSON)
app.use(express.json());

// 3. 測試路由 (確認伺服器活著)
app.get('/', (req, res) => {
  res.send('Week11 Server is running!');
});

// 4. 啟動伺服器
app.listen(PORT, () => {
  console.log(` 伺服器已啟動，網址: http://localhost:${PORT}`);
});