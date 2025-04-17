function solution(s) {
  let sArr = s.split("");
  var answer = true;
  let stack = [];

  if (s[0] == ")") return false;

  let idx = 0;
  while (sArr.length > idx) {
    if (sArr[idx] === "(") stack.push(sArr[idx]);
    else {
      stack.pop();
    }
    idx++;
  }

  return stack.length == 0;
}
