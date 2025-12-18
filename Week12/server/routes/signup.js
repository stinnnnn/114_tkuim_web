import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
    findAllParticipants, 
    findParticipantsByOwner, 
    createParticipant, 
    findParticipantById, 
    deleteParticipant 
} from '../repositories/participants.js';

const router = express.Router();

// 守門員：確保底下所有 API 都要登入才能用
router.use(authMiddleware);

// 1. GET: 查詢資料
router.get('/', async (req, res) => {
    try {
        const user = req.user;
        let data;

        // ★ 核心邏輯：區分角色
        if (user.role === 'admin') {
            // 如果是管理員，撈出全部
            data = await findAllParticipants();
        } else {
            // 如果是學生，只撈出「屬於他 (ownerId === user.id)」的資料
            data = await findParticipantsByOwner(user.id);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: '讀取失敗' });
    }
});

// 2. POST: 新增報名
router.post('/', async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        // 簡單驗證
        if (!name || !phone) {
            return res.status(400).json({ error: '請輸入姓名與電話' });
        }

        // ★ 核心邏輯：強制綁定當前登入者為擁有者 (ownerId)
        // 這樣就不會發生「幫別人報名」的狀況
        const newParticipant = await createParticipant({
            name,
            phone,
            ownerId: req.user.id // 從 Token 解析出來的 ID
        });

        res.status(201).json(newParticipant);
    } catch (error) {
        res.status(500).json({ error: '新增失敗' });
    }
});

// 3. DELETE: 刪除資料 (權限控管最嚴格的地方)
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;

        // 先檢查這筆資料存不存在
        const participant = await findParticipantById(id);
        if (!participant) {
            return res.status(404).json({ error: '找不到該筆資料' });
        }

        // ★ 核心邏輯：權限檢查
        // 允許刪除的條件：(我是管理員) OR (這筆資料的 ownerId 是我)
        if (user.role === 'admin' || participant.ownerId === user.id) {
            await deleteParticipant(id);
            res.json({ message: '刪除成功' });
        } else {
            // 否則，你無權刪除別人的資料
            res.status(403).json({ error: '權限不足：你不能刪除他人的資料' });
        }

    } catch (error) {
        res.status(500).json({ error: '刪除失敗' });
    }
});

export default router;