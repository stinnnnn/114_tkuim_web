const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // 讀取 .env 裡的設定來連線
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB 連線成功！');
  } catch (err) {
    console.error(' MongoDB 連線失敗:', err.message);
    process.exit(1); // 連線失敗就直接結束程式
  }
};

module.exports = connectDB;