// example1_script.js
// 統一在父層監聽事件，處理新增、刪除與完成切換

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `
    ${value}
    <div class="btn-group">
      <button class="btn btn-sm btn-success" data-action="toggle">完成</button>
      <button class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>
    </div>
  `;
  list.appendChild(item);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('[data-action="remove"]')) {
    const item = target.closest('li');
    if (item) item.remove();
  }

  if (target.closest('[data-action="toggle"]')) {
    const item = target.closest('li');
    if (item) {
      item.classList.toggle('list-group-item-success');
    }
  }
});

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});
