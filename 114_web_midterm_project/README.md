# 114 網頁程式設計 — 期中小組專案  
## 點餐小幫手｜Order Helper Web App

本專案為 114（上）網頁程式設計 **期中小組專案**，以兩人小組完成。  
我們製作了一個具有 **表單驗證、即時計算、訂單管理、深色模式、localStorage** 的互動式點餐工具。

此專案已部署至 GitHub Pages：    
[https://username.github.io/114_web_midterm_project/](https://github.com/stinnnnn/114_tkuim_web/tree/main/114_web_midterm_project)

---

##  專案簡介

「點餐小幫手」是一個模擬飲料與輕食點餐流程的網頁 App。  
使用者可以輸入個人資訊、選擇餐點與加購內容，系統會自動計算金額、驗證表單是否正確，並將訂單動態加入右側清單。

訂單會自動存到瀏覽器的 **localStorage**，即使重新整理也不會消失。

---

##  專案結構

midterm_project/
│── index.html # 主頁面
│── style.css # 自訂樣式
│── script.js # 互動與邏輯
│── assets/ # 圖片、素材
│── screenshots/ # 截圖用資料夾
└── README.md # 說明文件

---

##  使用技術

###  HTML5
- 語意化標籤（header / nav / main / section / footer）
- HTML5 原生表單驗證（required、pattern、min、max…）

###  CSS3
- 基礎排版、按鈕樣式、捲動區塊
- RWD 響應式設計

###  Bootstrap 5
- 網格系統（Grid System）
- Navbar、Card、Button、Form 組件
- 支援深色模式（data-bs-theme）

###  JavaScript（原生）
- DOM 操作（querySelector、createElement、事件委派）
- 即時金額計算（動態更新）
- Constraint Validation API（自訂錯誤訊息）
- 訂單建立 / 刪除 / 清空
- 匯出 JSON 按鈕
- 深色模式切換
- localStorage 保存訂單與設定

---

##  功能特色

### 🔹 1. 即時計算金額
包含：
- 品項金額
- 數量
- 加購選項（冰塊 +$5、濃縮 +$20）
- 折扣碼（HELLO10 九折、STUDENT5 九五折）

送出前即時計算顯示。

---

### 🔹 2. 服務條款 — 捲到最底才能勾選
使用者必須 **將服務條款捲動到底部**  
系統才會自動啟用「同意條款」的 checkbox。

避免跳過閱讀的情形，提高 UX。

---

### 🔹 3. 表單驗證（HTML5 + 自訂提示）
包含：
- 手機格式 `09xxxxxxxx`
- Email 格式
- 姓名長度
- 品項必選
- 同意服務條款
- Constraint Validation API 自訂錯誤訊息

驗證未通過無法送出。

---

### 🔹 4. 訂單管理（DOM 動態建立）
右側訂單區具備：
- 動態產生清單項目
- 顯示顧客資訊
- 顯示加購與折扣資訊
- 單筆刪除（事件委派）
- 訂單總額統計

---

### 🔹 5. 匯出 JSON
可將所有訂單匯出成 JSON 檔，用於紀錄或其他用途：

[
{
"name": "小明",
"item": "latte",
"qty": 2,
"total": 140
}
]


---

### 🔹 6. 深色模式（Dark Mode）
可自由切換 Light / Dark，偏好會存入 localStorage。

---

### 🔹 7. localStorage 支援
下列內容會被自動保存：
- 使用者已建立的訂單列表
- 深色模式選擇

重新整理不會清空資料。

---

##  專案截圖


screenshots/
│── home.png # 首頁
│── form_validation.png# 錯誤提示
│── order_list.png # 訂單預覽
└── dark_mode.png # 深色模式畫面


---



##  小組成員與分工

| 組員 | 工作內容 |
|------|----------|
| 412631326詹濬遠 | HTML 結構、CSS 設計、RWD、README 撰寫、截圖整理 |
| 412631177何厚璿 | JavaScript 主功能、表單驗證、深色模式、localStorage、GitHub Pages |

---

##  心得與學習

透過本次期中專案，我們學會了：

- HTML / CSS / JS 的整合應用
- Bootstrap 的排版技巧
- 表單驗證與 UX 的實作方式
- 使用 DOM 建立互動式內容
- 如何將專案部署到 GitHub Pages
- localStorage 的實際使用方式

---

##  完成！

本專案已符合所有課堂要求，並額外加入深色模式、localStorage、服務條款捲到底等加分功能。

如需 Demo 或原始碼可參考 GitHub Repo。  
歡迎老師與同學提問或建議！
