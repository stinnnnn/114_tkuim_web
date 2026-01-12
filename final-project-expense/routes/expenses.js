const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // 匯入剛剛寫好的模型

// 1. 取得所有消費紀錄 (READ)
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // 按日期新到舊排序
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. 新增一筆消費 (CREATE)
router.post('/', async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date // 前端如果有傳日期就用，沒傳就用預設今天
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense); // 201 代表建立成功
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. 刪除一筆消費 (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: '找不到這筆資料' });
    res.json({ message: '刪除成功' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;