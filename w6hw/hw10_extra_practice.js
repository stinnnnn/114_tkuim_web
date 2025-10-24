// 延伸練習：多重選單 + 矩陣運算 + 函式拆解（傳統語法）

// ===== 工具函式 =====
function toInt(str) {
  var n = parseInt(str, 10);
  return isNaN(n) ? null : n;
}

function promptInt(msg, min, max) {
  var s = prompt(msg);
  if (s === null) return null;
  var n = toInt(s);
  if (n === null) return null;
  if (typeof min === 'number' && n < min) return null;
  if (typeof max === 'number' && n > max) return null;
  return n;
}

function buildMatrix(rows, cols, label) {
  var m = [];
  for (var i = 0; i < rows; i++) {
    m[i] = [];
    for (var j = 0; j < cols; j++) {
      var v = parseFloat(prompt('輸入 ' + label + ' 的元素 [' + (i+1) + ',' + (j+1) + ']：'));
      if (isNaN(v)) {
        alert('輸入需為數字，將以 0 代替。');
        v = 0;
      }
      m[i][j] = v;
    }
  }
  return m;
}

function matrixToText(m) {
  var lines = [];
  for (var i = 0; i < m.length; i++) {
    lines.push(m[i].join('\t'));
  }
  return lines.join('\n');
}

function addMatrix(a, b) {
  var r = a.length, c = a[0].length;
  var out = [];
  for (var i = 0; i < r; i++) {
    out[i] = [];
    for (var j = 0; j < c; j++) {
      out[i][j] = a[i][j] + b[i][j];
    }
  }
  return out;
}

function mulMatrix(a, b) {
  var r = a.length, c = b[0].length, kMax = a[0].length;
  var out = [];
  for (var i = 0; i < r; i++) {
    out[i] = [];
    for (var j = 0; j < c; j++) {
      var sum = 0;
      for (var k = 0; k < kMax; k++) {
        sum += a[i][k] * b[k][j];
      }
      out[i][j] = sum;
    }
  }
  return out;
}

// ===== 主流程（多重選單 + 巢狀條件）=====
var pre = document.getElementById('result');
var content = '=== 延伸練習 ===\n';

var menu = prompt(
  '選擇功能：\n' +
  '1) 矩陣相加（同維度）\n' +
  '2) 矩陣相乘（A[m×n] × B[n×p]）\n' +
  '3) 輸出星號矩形（rows×cols）\n' +
  '其他) 離開'
);

switch (menu) {
  case '1': {
    var r = promptInt('請輸入列數 rows（1–5）：', 1, 5);
    var c = promptInt('請輸入行數 cols（1–5）：', 1, 5);
    if (r === null || c === null) {
      content += '輸入有誤，結束。\n';
      break;
    }
    var A = buildMatrix(r, c, '矩陣 A');
    var B = buildMatrix(r, c, '矩陣 B');
    var C = addMatrix(A, B);

    content += '[矩陣相加]\nA:\n' + matrixToText(A) + '\n\n';
    content += 'B:\n' + matrixToText(B) + '\n\n';
    content += 'A + B:\n' + matrixToText(C) + '\n';
    alert('矩陣相加完成，請看頁面結果。');
    break;
  }
  case '2': {
    var m = promptInt('請輸入 A 的列數 m（1–5）：', 1, 5);
    var n = promptInt('請輸入 A 的行數 / B 的列數 n（1–5）：', 1, 5);
    var p = promptInt('請輸入 B 的行數 p（1–5）：', 1, 5);
    if (m === null || n === null || p === null) {
      content += '輸入有誤，結束。\n';
      break;
    }
    var A2 = buildMatrix(m, n, '矩陣 A');
    var B2 = buildMatrix(n, p, '矩陣 B');
    var C2 = mulMatrix(A2, B2);

    content += '[矩陣相乘]\nA(' + m + '×' + n + '):\n' + matrixToText(A2) + '\n\n';
    content += 'B(' + n + '×' + p + '):\n' + matrixToText(B2) + '\n\n';
    content += 'A × B (' + m + '×' + p + '):\n' + matrixToText(C2) + '\n';
    alert('矩陣相乘完成，請看頁面結果。');
    break;
  }
  case '3': {
    var rr = promptInt('請輸入 rows（1–20）：', 1, 20);
    var cc = promptInt('請輸入 cols（1–40）：', 1, 40);
    if (rr === null || cc === null) {
      content += '輸入有誤，結束。\n';
      break;
    }
    // 多重迴圈：輸出星號矩形
    var box = '';
    for (var i = 0; i < rr; i++) {
      var line = '';
      for (var j = 0; j < cc; j++) {
        line += '*';
      }
      box += line + '\n';
    }
    content += '[星號矩形 ' + rr + '×' + cc + ']\n' + box;
    alert('星號矩形已產生，請看頁面結果。');
    break;
  }
  default:
    content += '已離開。';
}

console.log('[Extra]\n' + content);
pre.textContent = content;
