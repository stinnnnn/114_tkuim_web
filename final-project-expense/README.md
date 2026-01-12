#  個人記帳系統 (Expense Tracker)

114學年度上學期「網路程式設計」期末專題。
這是一個基於 RESTful API 架構的全端網頁應用程式，使用者可以輕鬆紀錄日常消費、查看總支出，並進行資料的增刪查改 (CRUD)。

##  技術選型
* **前端**：HTML5, CSS3, Vanilla JavaScript (原生 JS)
* **後端**：Node.js, Express.js
* **資料庫**：MongoDB Atlas (Mongoose ODM)
* **版本控制**：Git & GitHub

##  系統架構圖
本系統採用經典的 MVC 分層架構設計：

```mermaid
graph LR
    A[使用者/瀏覽器] -- HTTP Request --> B[Node.js Server]
    B -- Mongoose --> C[(MongoDB 資料庫)]
    C -- JSON Data --> B
    B -- JSON Response --> A
```

##  安裝與執行步驟
### 1️ 複製專案（Clone）
```bash
git clone https://github.com/stinnnnn/final-project-expense.git
cd final-project-expense
```
### 2️ 安裝相依套件
```bash
npm install
```
### 3️ 設定環境變數
請在專案根目錄建立 `.env` 檔案，並填入以下內容：
```env
PORT=5000
MONGODB_URI=mongodb+srv://admin:stin0704@cluster0.mjdldp6.mongodb.net/?appName=Cluster0
```
### 4️ 啟動伺服器
```bash
npm run start
# 或 node server.js
```
### 5 開啟瀏覽器並前往：http://localhost:5000 即可使用。

## API 規格文件
| 功能 | 方法 | 路徑 | Request Body | Response |
|----|----|----|----|----|
| 讀取所有紀錄 | GET | /api/expenses | 無 | `{ "_id": "...", "title": "午餐", "amount": 100 }` |
| 新增紀錄 | POST | /api/expenses | `{ title, amount, category }` | `{ success: true, data: {...} }` |
| 刪除紀錄 | DELETE | /api/expenses/:id | 無 | `{ message: "刪除成功" }` |

##  CRUD 流程設計

### Create（新增）
前端表單送出  
→ POST API  
→ 寫入 MongoDB  
→ 回傳資料  
→ 前端動態新增 DOM

### Read（讀取）
網頁載入  
→ GET API  
→ 讀取 MongoDB  
→ 回傳陣列  
→ 前端渲染列表

### Delete（刪除）
點擊刪除按鈕  
→ DELETE API  
→ MongoDB 刪除指定 ID  
→ 回傳成功訊息  
→ 前端移除 DOM

##  Student Info

- 系級：資管系三年級
- 學號：412631326
- 姓名：詹清遠
