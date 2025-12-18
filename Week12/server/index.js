import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import signupRoutes from './routes/signup.js';
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware (中間件)
app.use(cors()); // 允許跨網域請求 (讓前端可以呼叫後端)
app.use(express.json()); // 讓後端看得懂 JSON 格式的請求
app.use(express.static('client'));

// 測試路由：確認伺服器活著
app.get('/', (req, res) => {
    res.send('Week 12 Server is Running!');
});
app.use('/auth', authRoutes);
app.use('/api/signup', signupRoutes);
// 啟動流程：先連資料庫 -> 再啟動伺服器
async function startServer() {
    await connectDB();
    
    app.listen(port, () => {
        console.log(`🚀 伺服器已啟動: http://localhost:${port}`);
    });
}

startServer();