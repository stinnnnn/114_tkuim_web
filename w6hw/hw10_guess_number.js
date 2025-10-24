// 猜數字（1–100）
function random1to100() {
  return Math.floor(Math.random() * 100) + 1;
}

function isValidGuess(n) {
  return !isNaN(n) && n >= 1 && n <= 100 && Math.floor(n) === n;
}

var answer = random1to100();
var attempts = 0;
var history = [];
var pre = document.getElementById('result');

while (true) {
  var s = prompt('請輸入 1–100 的整數（取消可放棄）：');
  if (s === null) {
    // 使用者取消
    alert('已放棄，答案是：' + answer);
    history.push('[放棄]');
    break;
  }

  var g = parseFloat(s);
  attempts++;

  if (!isValidGuess(g)) {
    alert('請輸入 1–100 的整數！');
    history.push('第 ' + attempts + ' 次：' + s + '（非法）');
    continue;
  }

  history.push('第 ' + attempts + ' 次：' + g);

  if (g < answer) {
    alert('再大一點！');
  } else if (g > answer) {
    alert('再小一點！');
  } else {
    alert('恭喜猜中！答案是 ' + answer + '，共 ' + attempts + ' 次。');
    break;
  }
}

var lines = '答案：' + answer + '\n' +
            '總次數：' + attempts + '\n' +
            '歷程：\n - ' + history.join('\n - ');
console.log('[GuessNumber]\n' + lines);
pre.textContent = lines;
