const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique: true 會建立唯一索引
  phone: { type: String },
  status: { type: String, default: 'pending' }, // 預設狀態
  createdAt: { type: Date, default: Date.now }
});

// 匯出模型，讓其他檔案可以用
module.exports = mongoose.model('Participant', participantSchema);