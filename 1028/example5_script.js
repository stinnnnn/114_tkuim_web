

const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const agreeCheckbox = document.getElementById('agree');
const agreeLabel = document.querySelector('label[for="agree"]');
const agreeConfirmBtn = document.getElementById('agreeConfirmBtn');
const privacyModalEl = document.getElementById('privacyModal');
const privacyModal = new bootstrap.Modal(privacyModalEl);

function validateAllInputs(formElement) {
  let firstInvalid = null;
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));
  controls.forEach((control) => {
    control.classList.remove('is-invalid');
    if (!control.checkValidity()) {
      control.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = control;
    }
  });
  return firstInvalid;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  const firstInvalid = validateAllInputs(form);
  if (firstInvalid) {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    firstInvalid.focus();
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('資料已送出，感謝您的聯絡！');
  form.reset();
  Array.from(form.elements).forEach((el) => el.classList?.remove('is-invalid'));
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  Array.from(form.elements).forEach((el) => el.classList?.remove('is-invalid'));
});

form.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('is-invalid') && target.checkValidity()) {
    target.classList.remove('is-invalid');
  }
});

function interceptAgreeToggle(e) {
  if (!agreeCheckbox.checked) {
    e.preventDefault();
    e.stopPropagation();
    privacyModal.show();
  }
}

agreeCheckbox.addEventListener('click', interceptAgreeToggle);
agreeLabel.addEventListener('click', interceptAgreeToggle);
agreeCheckbox.addEventListener('keydown', (e) => {
  const isSpace = e.code === 'Space' || e.key === ' ' || e.keyCode === 32;
  if (isSpace && !agreeCheckbox.checked) {
    interceptAgreeToggle(e);
  }
});

agreeConfirmBtn.addEventListener('click', () => {
  agreeCheckbox.checked = true;
  agreeCheckbox.classList.remove('is-invalid');
  setTimeout(() => agreeCheckbox.focus(), 0);
});

privacyModalEl.addEventListener('hidden.bs.modal', () => {
  if (!agreeCheckbox.checked) {
    agreeCheckbox.checked = false;
  }
});
