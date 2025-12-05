const express = require('express');
const router = express.Router();
const Participant = require('../repositories/participant');

// POST /api/signup - 建立報名
router.post('/', async (req, res) => {
  try {
    // 1. 從前端傳來的資料拿出這些欄位
    const { name, email, phone } = req.body;

    // 2. 寫入資料庫
    const newParticipant = await Participant.create({ name, email, phone });

    // 3. 成功回傳 ID
    res.status(201).json({ _id: newParticipant._id });

  } catch (error) {
    // 4. 錯誤處理：如果是重複的 Email (錯誤代碼 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: '這個 Email 已經報名過了，請勿重複報名！' });
    }
    // 其他錯誤
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;