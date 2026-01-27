function solution(s) {
  let ans = 0;

  if (s.length % 2 !== 0) return 0;

  for (let i = 0; i < s.length; i++) {
    let newStr = s.slice(i, s.length) + s.slice(0, i);

    if (isCorrect(newStr)) ans++;
  }

  return ans;
}

function isCorrect(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "[" || s[i] === "{" || s[i] == "(") {
      stack.push(s[i]);
    } else {
      let target = s[i];
      let compare = stack[stack.length - 1];

      if (target === "]") {
        if (compare !== "[") return false;
        stack.pop();
      } else if (target === "}") {
        if (compare !== "{") return false;
        stack.pop();
      } else if (target === ")") {
        if (compare !== "(") return false;
        stack.pop();
      }
    }
  }

  return stack.length === 0;
}
