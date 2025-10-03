function solution(s) {
  var answer = 0;
  for (let i = 0; i < s.length; i++) {
    let newString = s.slice(i, s.length) + s.slice(0, i);
    if (isCorrect(newString)) answer++;
  }

  return answer;
}

function isCorrect(string) {
  let stack = [];
  let cnt = 0;
  for (let s of string) {
    if (s === "[" || s === "{" || s === "(") {
      stack.push(s);
      cnt++;
    } else {
      let last = stack.pop();
      if (
        (last === "[" && s !== "]") ||
        (last === "{" && s !== "}") ||
        (last === "(" && s !== ")")
      ) {
        return false;
      }
    }
  }
  if (cnt < string.length / 2) return false;
  return stack.length === 0;
}
