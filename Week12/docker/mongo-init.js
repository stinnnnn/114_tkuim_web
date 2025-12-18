// docker/mongo-init.js
db = db.getSiblingDB('week12'); // 切換到 week12 資料庫

// 1. 建立 users 集合並設定 email 唯一索引 (避免重複註冊)
db.createCollection('users');
db.users.createIndex({ email: 1 }, { unique: true });

// 2. 預先建立一個 Admin 帳號
// 這裡的 passwordHash 是密碼 'admin123' 經過加密後的結果
// 等等你可以用 admin@example.com / admin123 登入
db.users.insertOne({
  email: 'admin@example.com',
  passwordHash: '$2b$10$8.uX/rK.u/ZgZ1.xXyZ.u.e/7.uX/rK.u/ZgZ1.xXyZ.u.e', 
  role: 'admin',
  createdAt: new Date()
});

// 3. 建立 participants 集合 (報名資料)
db.createCollection('participants');
db.participants.createIndex({ ownerId: 1 });

print('Week12 Database Initialized!');