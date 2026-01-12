const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // 標題必填
  },
  amount: {
    type: Number,
    required: true // 金額必填
  },
  date: {
    type: Date,
    default: Date.now // 預設為當前時間
  },
  category: {
    type: String, // 例如：飲食、交通
    required: false
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);