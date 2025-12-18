import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// 讀取 .env 檔案
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
let db = null;

// 連線函式
export async function connectDB() {
    if (db) return db; // 如果已經連線過，就直接回傳，不用重連
    try {
        await client.connect();
        console.log('✅ 成功連線到 MongoDB 資料庫！');
        db = client.db('week12'); // 切換到 week12 資料庫
        return db;
    } catch (error) {
        console.error('❌ 資料庫連線失敗:', error);
        process.exit(1); // 連線失敗就直接結束程式
    }
}

// 取得集合 (Collection) 的小工具，之後會很常用
export function getCollection(collectionName) {
    if (!db) {
        throw new Error('資料庫尚未初始化，請先呼叫 connectDB()');
    }
    return db.collection(collectionName);
}