import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../repositories/users.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // 從 .env 拿密鑰

// 1. 註冊 API (POST /auth/signup)
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 簡單檢查
        if (!email || !password) {
            return res.status(400).json({ error: '請輸入 Email 和密碼' });
        }

        // 檢查 Email 是否已被註冊
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: '此 Email 已被註冊' });
        }

        // ★ 關鍵：密碼加密 (Hash)
        // 10 是 salt rounds，數字越大加密越久但越安全
        const passwordHash = await bcrypt.hash(password, 10);

        // 存入資料庫
        const user = await createUser({ email, passwordHash });

        res.status(201).json({ 
            message: '註冊成功',
            user: { id: user._id, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '註冊失敗' });
    }
});

// 2. 登入 API (POST /auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 找人
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: '帳號或密碼錯誤' });
        }

        // ★ 關鍵：比對密碼
        // 拿使用者輸入的 password 跟資料庫裡的 passwordHash 比對
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: '帳號或密碼錯誤' });
        }

        // ★ 關鍵：簽發 Token (JWT)
        const token = jwt.sign(
            { 
                sub: user._id,   // Subject: 誰
                email: user.email,
                role: user.role  // Role: 權限
            },
            JWT_SECRET,
            { expiresIn: '2h' } // 2小時後過期
        );

        res.json({ 
            message: '登入成功',
            token, 
            user: { email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '登入失敗' });
    }
});

export default router;