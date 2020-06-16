
// 空白填充
export function filterBlank(val) {
  if (val === undefined || val === null || val === 'null' || val === '') {
    return '-';
  }
  return val;
}

// 保留小数位数
export function toFixed(val, acc) {
  let num = parseFloat(val);
  if (isNaN(num)) {
    num = 0;
  }
  let accuracy = parseInt(acc, 10);
  if (isNaN(accuracy) || accuracy < 0 || accuracy > 10) {
    accuracy = 2;
  }
  return num.toFixed(accuracy);
}
