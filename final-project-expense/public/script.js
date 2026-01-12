const form = document.getElementById('form');
const list = document.getElementById('list');
const totalAmount = document.getElementById('total-amount');

const API_URL = '/api/expenses';

// 1. 從後端取得資料並顯示
async function getExpenses() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // 清空列表
        list.innerHTML = '';
        
        // 算出總金額
        const total = data.reduce((acc, item) => acc + item.amount, 0);
        totalAmount.innerText = `$${total}`;

        // 顯示每一筆資料
        data.forEach(addExpenseToDOM);
    } catch (err) {
        console.error('Error:', err);
    }
}

// 將資料加入 HTML 畫面
function addExpenseToDOM(expense) {
    const item = document.createElement('li');
    item.innerHTML = `
        ${expense.title} <span>$${expense.amount}</span>
        <button class="delete-btn" onclick="removeExpense('${expense._id}')">x</button>
    `;
    list.appendChild(item);
}

// 2. 新增消費
async function addExpense(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const amount = +document.getElementById('amount').value; // +轉成數字
    const category = document.getElementById('category').value;

    if (title.trim() === '' || amount === 0) {
        alert('請輸入完整資訊');
        return;
    }

    const expenseData = { title, amount, category };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expenseData)
        });

        if (res.ok) {
            // 新增成功後，重新抓取資料更新畫面
            getExpenses();
            // 清空輸入框
            document.getElementById('title').value = '';
            document.getElementById('amount').value = '';
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// 3. 刪除消費
async function removeExpense(id) {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            getExpenses(); // 刪除後更新畫面
        } catch (err) {
            console.error('Error:', err);
        }
    }
}

// 事件監聽
form.addEventListener('submit', addExpense);
getExpenses(); // 網頁載入時先抓一次資料