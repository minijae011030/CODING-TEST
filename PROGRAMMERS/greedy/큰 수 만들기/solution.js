function solution(number, k) {
  let stack = [];

  for (let i = 0; i < number.length; i++) {
    // 지울 수 있는 숫자가 남아있고 스택의 마지막 숫자보다 현재의 숫자가 더 크면
    // 스택의 마지막 원소를 계속 지운다
    while (k > 0 && stack[stack.length - 1] < number[i]) {
      stack.pop();
      k--;
    }

    // 지울 수 있는 숫자가 남아있지 않거나
    // 스택의 마지막 숫자보다 현재의 숫자가 작거나 같다면
    // 스택에 현재의 원소를 넣는다
    stack.push(number[i]);
  }

  // 숫자가 계속 작아져서 while문에 걸리지 않았던 경우
  if (k > 0) {
    stack.pop();
    k--;
  }

  return stack.join("");
}
