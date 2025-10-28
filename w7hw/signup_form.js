
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const form = $('#signup-form');
const submitBtn = $('#submitBtn');
const resetBtn = $('#resetBtn');
const successBox = $('#success-box');

const fullName = $('#fullName');
const email = $('#email');
const phone = $('#phone');
const password = $('#password');
const confirmPassword = $('#confirmPassword');
const interestsWrap = $('#interests');
const terms = $('#terms');

const interestCountEl = $('#interest-count');
const strengthText = $('#strength-text');

const ERROR_MAP = {
  fullName: $('#fullName-error'),
  email: $('#email-error'),
  phone: $('#phone-error'),
  password: $('#password-error'),
  confirmPassword: $('#confirmPassword-error'),
  interests: $('#interests-error'),
  terms: $('#terms-error'),
};

function getPasswordStrength(pw) {
  if (!pw) return { level: 'none', label: '—' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { level: 'weak', label: '弱' };
  if (score === 3 || score === 4) return { level: 'medium', label: '中' };
  return { level: 'strong', label: '強' };
}

function renderStrength(pw) {
  const { level, label } = getPasswordStrength(pw);
  strengthText.textContent = `強度：${label}`;
  const row = password.closest('.form-row');
  row.classList.remove('strength--weak', 'strength--medium', 'strength--strong');
  if (level === 'weak') row.classList.add('strength--weak');
  if (level === 'medium') row.classList.add('strength--medium');
  if (level === 'strong') row.classList.add('strength--strong');
}

function setError(inputEl, msg, keyForGroup) {
  const key = keyForGroup || inputEl.id;
  ERROR_MAP[key].textContent = msg || '';
  inputEl.classList.toggle('is-invalid', !!msg);
  inputEl.setCustomValidity(msg || '');
}

function clearError(inputEl, keyForGroup) {
  setError(inputEl, '', keyForGroup);
}

function validateFullName() {
  if (!fullName.value.trim()) {
    setError(fullName, '請輸入姓名。');
    return false;
  }
  clearError(fullName);
  return true;
}

function validateEmail() {
  let v = email.value.normalize('NFKC')
    .replace(/\u200B|\u200C|\u200D|\uFEFF/g, '')
    .trim()
    .replace(/\s+/g, '');
  email.value = v;

  email.setCustomValidity('');
  if (!v) {
    setError(email, '請輸入 Email。');
    return false;
  }

  let ok = email.checkValidity();
  if (!ok) {
    ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  if (!ok) {
    setError(email, 'Email 格式不正確。');
    return false;
  }

  clearError(email);
  return true;
}

function validatePhone() {
  const v = phone.value.trim();
  if (!v) {
    setError(phone, '請輸入手機號碼。');
    return false;
  }
  if (!/^\d{10}$/.test(v)) {
    setError(phone, '手機需為 10 碼數字（例如：0912345678）。');
    return false;
  }
  clearError(phone);
  return true;
}

function validatePassword() {
  const v = password.value;
  if (!v) {
    setError(password, '請輸入密碼。');
    return false;
  }
  const okLen = v.length >= 8;
  const hasLetter = /[A-Za-z]/.test(v);
  const hasDigit = /\d/.test(v);
  if (!(okLen && hasLetter && hasDigit)) {
    setError(password, '至少 8 碼，且需包含英文字母與數字。');
    return false;
  }
  clearError(password);
  return true;
}

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    setError(confirmPassword, '請再次輸入密碼。');
    return false;
  }
  if (confirmPassword.value !== password.value) {
    setError(confirmPassword, '兩次密碼不一致。');
    return false;
  }
  clearError(confirmPassword);
  return true;
}

function validateInterests() {
  const checks = $$('input[type="checkbox"][name="interests"]', interestsWrap);
  const any = checks.some(c => c.checked);
  if (!any) {
    const anchor = checks[0];
    setError(anchor, '請至少勾選 1 個興趣。', 'interests');
    return false;
  }
  clearError(checks[0], 'interests');
  return true;
}

function validateTerms() {
  if (!terms.checked) {
    setError(terms, '請勾選同意服務條款。', 'terms');
    return false;
  }
  clearError(terms, 'terms');
  return true;
}

function validateAll() {
  const validators = [
    validateFullName,
    validateEmail,
    validatePhone,
    validatePassword,
    validateConfirmPassword,
    validateInterests,
    validateTerms,
  ];
  for (const fn of validators) {
    if (!fn()) return $('.is-invalid', form);
  }
  return null;
}

function refreshInterestCount() {
  const labels = $$('.tag', interestsWrap);
  labels.forEach(lab => {
    const cb = $('input[type="checkbox"]', lab);
    lab.classList.toggle('active', cb.checked);
  });
  const count = $$('input[name="interests"]:checked', interestsWrap).length;
  interestCountEl.textContent = String(count);
}
interestsWrap.addEventListener('change', e => {
  if (e.target.matches('input[type="checkbox"][name="interests"]')) {
    refreshInterestCount();
    validateInterests();
    saveToStorage();
  }
});

form.addEventListener('blur', e => {
  const t = e.target;
  if (t === fullName) validateFullName();
  if (t === email) validateEmail();
  if (t === phone) validatePhone();
  if (t === password) validatePassword();
  if (t === confirmPassword) validateConfirmPassword();
}, true);

form.addEventListener('input', e => {
  const t = e.target;
  if (t === fullName) validateFullName();
  if (t === email) validateEmail();
  if (t === phone) validatePhone();
  if (t === password) {
    renderStrength(password.value);
    validatePassword();
    validateConfirmPassword();
  }
  if (t === confirmPassword) validateConfirmPassword();
  if (t === terms) validateTerms();
  saveToStorage();
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  successBox.hidden = true;

  const firstInvalid = validateAll();
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  await new Promise(r => setTimeout(r, 1000));
  successBox.hidden = false;

  form.reset();
  renderStrength('');
  $$('.is-invalid', form).forEach(el => el.classList.remove('is-invalid'));
  refreshInterestCount();
  localStorage.removeItem('wk07_signup');

  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  renderStrength('');
  $$('.is-invalid', form).forEach(el => el.classList.remove('is-invalid'));
  Object.values(ERROR_MAP).forEach(el => el.textContent = '');
  refreshInterestCount();
  successBox.hidden = true;
  localStorage.removeItem('wk07_signup');
});

function saveToStorage() {
  const data = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    interests: $$('input[name="interests"]:checked', interestsWrap).map(c => c.value),
    terms: terms.checked,
  };
  localStorage.setItem('wk07_signup', JSON.stringify(data));
}

function restoreFromStorage() {
  try {
    const raw = localStorage.getItem('wk07_signup');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.fullName) fullName.value = data.fullName;
    if (data.email) email.value = data.email;
    if (data.phone) phone.value = data.phone;
    $$('input[name="interests"]', interestsWrap).forEach(cb => {
      cb.checked = data.interests?.includes(cb.value) ?? false;
    });
    terms.checked = !!data.terms;
    refreshInterestCount();
  } catch {}
}

document.addEventListener('DOMContentLoaded', () => {
  restoreFromStorage();
  refreshInterestCount();
  renderStrength('');
});
