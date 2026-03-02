function solution(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let cur = s[i];
    if (stack[stack.length - 1] === cur) stack.pop();
    else stack.push(s[i]);
  }

  return stack.length > 0 ? 0 : 1;
}
