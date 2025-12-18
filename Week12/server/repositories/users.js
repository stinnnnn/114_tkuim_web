import { getCollection } from '../db.js';

// 透過 Email 尋找使用者
export async function findUserByEmail(email) {
    const users = getCollection('users');
    return await users.findOne({ email });
}

// 建立新使用者
export async function createUser({ email, passwordHash, role = 'student' }) {
    const users = getCollection('users');
    
    const newUser = {
        email,
        passwordHash, // 注意：這裡存的是加密後的亂碼，不是明碼
        role,         // 角色：admin 或 student
        createdAt: new Date()
    };
    
    const result = await users.insertOne(newUser);
    // 回傳建立好的資料 (包含自動產生的 _id)
    return { ...newUser, _id: result.insertedId };
}