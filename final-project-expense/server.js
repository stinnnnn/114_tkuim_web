const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 新增這行
require('dotenv').config();
const expensesRouter = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/expenses', expensesRouter);

// MongoDB 連線設定 (新增這段)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 資料庫連線成功！'))
  .catch(err => console.error('MongoDB 連線失敗:', err));

// 測試路由
app.get('/', (req, res) => {
  res.send('後端伺服器運作中！');
});

app.listen(PORT, () => {
  console.log(`伺服器正在 port ${PORT} 執行中...`);
});