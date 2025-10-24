// lab_score_calculator.js
// 以 prompt 取得 5 科成績，計算平均與等第，並標記不及格警示

function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function gradeFrom(avg) {
  var g = 'F';
  if (avg >= 90) {
    g = 'A';
  } else if (avg >= 80) {
    g = 'B';
  } else if (avg >= 70) {
    g = 'C';
  } else if (avg >= 60) {
    g = 'D';
  } else {
    g = 'F';
  }
  return g;
}

var name = prompt('請輸入姓名：');
if (!name) {
  name = '同學';
}

// ===== 延伸練習：改讀 5 科 =====
var subjects = ['國文', '英文', '數學', '自然', '社會'];
var scores = [];
var hasInvalid = false;

for (var i = 0; i < subjects.length; i++) {
  var s = toNumber(prompt('請輸入 ' + subjects[i] + ' 成績：'));
  if (s === null) {
    hasInvalid = true;
  }
  scores.push(s);
}

var text = '';
if (hasInvalid) {
  text = '輸入有誤，請重新整理後再試。';
} else {
  var sum = 0;
  var hasFail = false; // ===== 有無不及格（任一科 < 60）=====
  for (var j = 0; j < scores.length; j++) {
    sum += scores[j];
    if (scores[j] < 60) {
      hasFail = true;
    }
  }
  var avg = sum / scores.length;

  text = '姓名：' + name + '\n';
  for (var k = 0; k < subjects.length; k++) {
    text += subjects[k] + '：' + scores[k] + '\n';
  }
  text += '平均：' + avg.toFixed(2) + '\n'
       + '等第：' + gradeFrom(avg);

  if (hasFail) {
    text += '\n※ 有不及格科目';
  }
}

console.log(text);
document.getElementById('result').textContent = text;
