function solution(prices) {
  let stack = [];
  const len = prices.length;
  let answer = new Array(len);

  for (let i = 0; i < len; ++i) {
    const current = prices[i];

    while (stack.length) {
      const top = stack[stack.length - 1];
      if (current < prices[top]) {
        answer[top] = i - top;
        stack.pop();
      } else break;
    }

    stack.push(i);
  }

  for (let i = 0; i < stack.length; ++i) {
    const idx = stack[i];
    answer[idx] = len - 1 - idx;
  }

  return answer;
}
