import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    // 1. 從 Header 拿出 Authorization 欄位
    const authHeader = req.headers.authorization;

    // 2. 檢查格式：必須是 "Bearer <Token>" 開頭
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // 401 Unauthorized: 沒帶票，或是票的格式錯了
        return res.status(401).json({ error: '請先登入 (缺少 Token 或格式錯誤)' });
    }

    // 取出 "Bearer " 後面的那串亂碼
    const token = authHeader.split(' ')[1];

    try {
        // 3. 驗證 Token (這一步最關鍵，JWT 會檢查簽名和過期時間)
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. 驗證成功！把使用者的資訊掛在 req 物件上
        // 這樣後面的路由 (例如 routes/signup.js) 就可以用 req.user 知道是誰了
        req.user = { 
            id: payload.sub, 
            email: payload.email, 
            role: payload.role 
        };

        // 5. 放行！繼續往下執行
        next(); 

    } catch (err) {
        // 驗證失敗 (可能是 Token 過期、或被竄改)
        return res.status(401).json({ error: 'Token 無效或已過期，請重新登入' });
    }
}