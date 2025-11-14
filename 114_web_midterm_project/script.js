const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const form = $("#orderForm");
const itemSel = $("#item");
const qtyInput = $("#qty");
const couponInput = $("#coupon");
const addonChecks = $$(".addon");
const liveTotal = $("#liveTotal");
const darkToggle = $("#darkToggle");
const saveHint = $("#saveHint");

const orderList = $("#orderList");
const orderCount = $("#orderCount");
const grandTotal = $("#grandTotal");
const exportBtn = $("#exportBtn");
const clearAllBtn = $("#clearAllBtn");
const resetBtn = $("#resetBtn");

const termsBox = $("#termsBox");
const termsHint = $("#termsHint");
const agreeCheck = $("#agree");

let orders = JSON.parse(localStorage.getItem("orders") || "[]");
let darkMode = localStorage.getItem("darkMode") === "true";

document.addEventListener("DOMContentLoaded", () => {
  darkToggle.checked = darkMode;
  applyTheme();

  renderOrders();

  [itemSel, qtyInput, couponInput, ...addonChecks].forEach(el => {
    el.addEventListener("input", updateLiveTotal);
    el.addEventListener("change", updateLiveTotal);
  });

  form.addEventListener("submit", onSubmit);
  form.addEventListener("input", onValidate);
  exportBtn.addEventListener("click", exportJSON);
  clearAllBtn.addEventListener("click", clearAll);
  resetBtn.addEventListener("click", resetForm);
  darkToggle.addEventListener("change", onThemeToggle);

  if (termsBox && agreeCheck) {
    agreeCheck.disabled = true;
    termsBox.addEventListener("scroll", onTermsScroll);
  }

  updateLiveTotal();
});

function onTermsScroll() {
  const box = termsBox;
  if (!box) return;

  const bottomReached = box.scrollTop + box.clientHeight >= box.scrollHeight - 5;
  if (bottomReached) {
    agreeCheck.disabled = false;
    termsHint.textContent = "已讀取到條款底部，可以勾選同意。";
    termsHint.classList.remove("text-danger");
    termsHint.classList.add("text-success");
  }
}

function getBasePrice() {
  const opt = itemSel.selectedOptions[0];
  return opt ? Number(opt.dataset.price || 0) : 0;
}

function getAddonsTotal() {
  return addonChecks.reduce((sum, c) =>
    c.checked ? sum + Number(c.dataset.price) : sum, 0);
}

function getCouponRate(code) {
  const c = (code || "").trim().toUpperCase();
  if (c === "HELLO10") return 0.9;
  if (c === "STUDENT5") return 0.95;
  return 1;
}

function calcTotal() {
  const base = getBasePrice();
  const addons = getAddonsTotal();
  const qty = Number(qtyInput.value || 0);
  const rate = getCouponRate(couponInput.value);

  const subtotal = (base + addons) * qty;
  return Math.round(subtotal * rate);
}

function updateLiveTotal() {
  const total = calcTotal();
  liveTotal.textContent = total > 0 ? `$${total}` : "-$-";
}

function onValidate(e) {
  if (e.target.id === "phone") {
    const ok = /^09\d{8}$/.test(e.target.value);
    e.target.setCustomValidity(ok ? "" : "請輸入 09 開頭共 10 碼的手機。");
  }

  if (e.target.id === "qty") {
    const q = Number(e.target.value);
    if (Number.isNaN(q) || q < 1 || q > 20) {
      e.target.setCustomValidity("數量需介於 1–20。");
    } else {
      e.target.setCustomValidity("");
    }
  }

  if (e.target.id === "item") {
    e.target.setCustomValidity(e.target.value ? "" : "請選擇一個品項。");
  }
}

let submitting = false; 

function onSubmit(ev) {
  ev.preventDefault();
  if (submitting) return;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.reportValidity();
    return;
  }

  submitting = true;

  const order = collectOrder();
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();

  showSavedHint();
  resetForm(true);

  setTimeout(() => { submitting = false; }, 500);
}

function collectOrder() {
  const addOns = addonChecks
    .filter(c => c.checked)
    .map(c => c.nextElementSibling.textContent.trim());

  return {
    id: Date.now(),
    name: $("#customerName").value.trim(),
    phone: $("#phone").value.trim(),
    email: $("#email").value.trim(),
    item: itemSel.value,
    itemLabel: itemSel.selectedOptions[0]?.textContent || "",
    qty: Number(qtyInput.value),
    addons: addOns,
    coupon: couponInput.value.trim().toUpperCase(),
    total: calcTotal()
  };
}

function renderOrders() {
  orderList.innerHTML = "";
  let sum = 0;

  orders.forEach(o => {
    sum += o.total;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div class="me-auto">
        <div class="fw-semibold">${o.itemLabel} × ${o.qty} — 
          <span class="text-primary">$ ${o.total}</span>
        </div>
        <div class="text-muted">顧客：${escapeHTML(o.name)}｜${escapeHTML(o.phone)}｜${escapeHTML(o.email)}</div>
        ${o.addons.length ? `<div class="small">加購：${o.addons.join("、")}</div>` : ""}
        ${o.coupon ? `<div class="small">折扣碼：${o.coupon}</div>` : ""}
      </div>
      <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${o.id}">刪除</button>
    `;
    orderList.appendChild(li);
  });

  grandTotal.textContent = '$' + sum;
  orderCount.textContent = String(orders.length);

  orderList.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
  }, { once: true });
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(orders, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "orders.json";
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  if (!confirm("確定要清空所有訂單？")) return;
  orders = [];
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

function resetForm(keepContact=false) {
  if (!keepContact) {
    form.reset();
  } else {
    const name = $("#customerName").value;
    const phone = $("#phone").value;
    const email = $("#email").value;

    form.reset();
    $("#customerName").value = name;
    $("#phone").value = phone;
    $("#email").value = email;
  }

  form.classList.remove("was-validated");
  updateLiveTotal();


  if (agreeCheck) {
    agreeCheck.checked = false;
    agreeCheck.disabled = true;
  }
  if (termsHint) {
    termsHint.textContent = "請先將服務條款捲動至底部，才能勾選同意。";
    termsHint.classList.remove("text-success");
    termsHint.classList.add("text-danger");
  }
}

function onThemeToggle() {
  darkMode = darkToggle.checked;
  localStorage.setItem("darkMode", darkMode);
  applyTheme();
}

function applyTheme() {
  document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
}

function showSavedHint() {
  saveHint.classList.remove("d-none");
  saveHint.style.opacity = "1";
  setTimeout(() => { saveHint.style.opacity = "0"; }, 1200);
  setTimeout(() => {
    saveHint.classList.add("d-none");
    saveHint.style.opacity = "";
  }, 1600);
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[s]);
}
