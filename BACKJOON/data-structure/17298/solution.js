const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 오큰수
 *
 * 수열의 각 원소 Ai에 대해 오큰수 NGE(i)
 * Ai의 오큰수: 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수
 * 그러한 수가 없는 경우: 오큰수 -1
 *
 * 3, 5, 2, 7
 * NGE(1) = 5
 * NGE(2) = 7
 * NGE(3) = 7
 * NGE(4) = -1
 */

let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);

// 일단 완탐으로다가

// let answer = [];
// for (let i = 0; i < n; i++) {
//   let a = arr[i];
//   let nge = -1;
//   for (let j = i + 1; j < n; j++) {
//     let b = arr[j];

//     if (a < b) {
//       nge = b;
//       break;
//     }
//   }
//   answer.push(nge);
// }

// console.log(answer.join(" "));

let answer = new Array(n);
let stack = [];

for (let i = n - 1; i >= 0; i--) {
  let current = arr[i];

  // 현재 값보다 작거나 같은 값들은 스택에서 모두 제거
  // 나보다 작으면 내 왼쪽에 있는 애들한테도 오큰수가 안됨
  while (stack.length > 0 && stack[stack.length - 1] <= current) {
    stack.pop();
  }

  // 오큰수 결정
  if (stack.length === 0) {
    answer[i] = -1;
  } else {
    answer[i] = stack[stack.length - 1];
  }

  // 현재 값을 다음 원소를 위한 후보로 스택에 추가
  stack.push(current);
}

console.log(answer.join(" "));
