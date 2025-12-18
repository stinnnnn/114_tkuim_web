# Week 12 - 登入系統與權限控管 (Authentication & Authorization)

**學號：** 412631326
**姓名：** 詹濬遠

## 專案簡介
本專案為網頁程式設計 Week 12 Lab，實作了完整的會員登入與權限管理系統。
採用 **JWT (JSON Web Token)** 進行狀態驗證，並區分 **Admin (管理員)** 與 **Student (一般使用者)** 兩種權限角色。

## 技術架構
- **Backend**: Node.js, Express
- **Database**: MongoDB (Docker Container)
- **Security**: 
  - `bcrypt`: 密碼雜湊加密 (避免明碼儲存)
  - `jsonwebtoken`: 簽發與驗證 Token
  - Middleware: 實作路由守門員，攔截未授權請求
- **Frontend**: 原生 HTML/JS (Fetch API)

## 檔案結構
Week12/
├── server/             # 後端 API 程式碼
│   ├── middleware/     # 權限驗證 (Auth Guard)
│   ├── repositories/   # 資料庫操作層
│   └── routes/         # API 路由 (Auth, Signup)
├── client/             # 前端網頁 (Login, Index)
├── docker/             # 資料庫設定與初始化腳本
└── docker-compose.yml  # 容器設定檔

##  如何啟動 (Quick Start)
1. **啟動資料庫**
   ```bash
   docker compose up -d
(初次啟動會自動執行 mongo-init.js 初始化 Admin 帳號)

2. **安裝套件**
   ```bash
   npm install
3. **啟動伺服器**
   ```bash
   npm run dev
伺服器將運行於：http://localhost:3000

##  測試帳號 (Demo Accounts)
| 角色 | Email | 密碼 | 權限說明 |
|------|-------|------|----------|
| **管理員** | `student1@test.com` | `mypassword123` | 可檢視所有資料、刪除任何人的資料 |
| **一般學生** | `student2@test.com` | `mypassword123` | 僅能檢視與刪除自己建立的資料 |
備註：student1 已透過資料庫指令手動升級為 Admin。

##  實作重點與心得
**1.密碼安全**:在註冊 API 中使用了 bcrypt 進行 hash，確保資料庫內不儲存明碼。

**2.權限邏輯**:
  - 透過 authMiddleware 解析 Header 中的 Bearer Token。
  - 在 DELETE API 中加入邏輯判斷：if (user.role === 'admin' || data.ownerId === user.id)，實現了精細的權限控管。

**3.前端整合**：使用 localStorage 儲存 Token，並在每次 Fetch 請求時自動帶入 Authorization Header。