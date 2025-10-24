// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表（延伸：可自訂範圍）

var startStr = prompt('請輸入起始（1~9）：');
var endStr = prompt('請輸入結束（1~9，且 >= 起始）：');

var start = parseInt(startStr, 10);
var end = parseInt(endStr, 10);

var output = '';
if (isNaN(start) || isNaN(end) || start < 1 || end > 9 || start > end) {
  output = '輸入範圍不正確（需 1~9 且起始 <= 結束）';
} else {
  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }
}

document.getElementById('result').textContent = output;