// 溫度轉換器（攝氏 ↔ 華氏）
// C = (F - 32) * 5 / 9
// F = C * 9 / 5 + 32

function toFixedStr(n, digits) {
  return (typeof n === 'number' && !isNaN(n)) ? n.toFixed(digits) : 'NaN';
}

var tStr = prompt('請輸入溫度數值：');
var unitStr = prompt('請輸入單位（C 或 F）：');

var pre = document.getElementById('result');
var lines = '';

var t = parseFloat(tStr);
var u = unitStr ? unitStr.trim().toUpperCase() : '';

if (isNaN(t) || (u !== 'C' && u !== 'F')) {
  var msgErr = '輸入有誤：溫度需為數字、單位需為 C 或 F。';
  alert(msgErr);
  lines = msgErr;
} else {
  var converted, out;
  if (u === 'C') {
    converted = t * 9 / 5 + 32;
    out = t + ' °C = ' + toFixedStr(converted, 2) + ' °F';
  } else {
    converted = (t - 32) * 5 / 9;
    out = t + ' °F = ' + toFixedStr(converted, 2) + ' °C';
  }
  alert(out);
  lines = '原始輸入：' + t + ' ' + u + '\n轉換結果：' + out;
  console.log('[TempConverter] ' + out);
}

pre.textContent = lines;
