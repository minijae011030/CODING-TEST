function solution(s) {
  let min = s.length;

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let arr = splitStr(s, i);

    let zipLen = 0;
    let el = arr[0];
    let repeat = 1;

    for (let j = 1; j < arr.length; j++) {
      if (el === arr[j]) {
        repeat++;
      } else {
        zipLen += (repeat > 1 ? String(repeat).length : 0) + el.length;
        el = arr[j];
        repeat = 1;
      }
    }
    zipLen += (repeat > 1 ? String(repeat).length : 0) + el.length;
    min = Math.min(min, zipLen);
  }

  return min;
}

function splitStr(str, len) {
  let arr = [];

  for (let i = 0; i < str.length; i += len) {
    arr.push(str.slice(i, i + len));
  }

  return arr;
}
