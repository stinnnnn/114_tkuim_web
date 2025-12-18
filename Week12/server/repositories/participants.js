import { ObjectId } from 'mongodb';
import { getCollection } from '../db.js';

const COLLECTION_NAME = 'participants';

// 1. 查詢所有資料 (給 Admin 用)
export async function findAllParticipants() {
    const collection = getCollection(COLLECTION_NAME);
    return await collection.find({}).toArray();
}

// 2. 查詢特定使用者的資料 (給一般學生用)
export async function findParticipantsByOwner(ownerId) {
    const collection = getCollection(COLLECTION_NAME);
    // 注意：資料庫存的 ownerId 是字串還是 ObjectId 要看你存的方式，這裡假設跟 Token 一樣是字串
    return await collection.find({ ownerId: ownerId }).toArray();
}

// 3. 建立新資料
export async function createParticipant(data) {
    const collection = getCollection(COLLECTION_NAME);
    const result = await collection.insertOne({
        ...data,
        createdAt: new Date()
    });
    return { ...data, _id: result.insertedId };
}

// 4. 根據 ID 找單筆資料 (刪除前要先檢查用)
export async function findParticipantById(id) {
    const collection = getCollection(COLLECTION_NAME);
    try {
        return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        return null; // 如果 ID 格式不對，就當作找不到
    }
}

// 5. 刪除資料
export async function deleteParticipant(id) {
    const collection = getCollection(COLLECTION_NAME);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}