const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 수 묶기
 *
 * 길이가 n인 수열
 * 그 수열의 합을 구하려고 함
 * 그 수열의 합을 모두 더해서 구하는 것이 아님
 * 수열의 두 수를 묶으려고 함
 *
 * 위치에 상관없이 묶을 수 있지만 자기 자신은 안됨
 * 어떤 수를 묶으면 수열의 합을 구할 때 묶은 수는 서로 곱한 후에 더함
 *
 * 0, 1, 2, 3, 4, 5
 * 0 + 1 + (2 * 3) + (4 * 5) = 27 => 최대
 *
 * 모든 수는 단 한번만 묶거나 아니면 묶지 않아야 한다.
 * 그 합이 최대!
 *
 * 1은 안묶는다
 * 음수는 0, 음수랑 곱해준다
 * 양수는 양수랑 곱해준다
 *
 * 양수 (2 이상) 을 두개씩 곱해준다
 * 음수 (0 포함) 을 두개씩 곱해준다
 * 1은 그냥 더해준다
 */

let idx = 0;
const n = Number(input[idx++]);

let arr = [];
for (let i = 0; i < n; i++) {
  arr.push(Number(input[idx++]));
}

// if (n === 1) {
//   console.log(arr[0]);
// } else if (n === 2) {
//   if (Math.sign(arr[0]) === Math.sign(arr[1])) {
//     console.log(arr[0] * arr[1]);
//   } else {
//     console.log(arr[0] + arr[1]);
//   }
// } else {
let answer = 0;
let arr1 = []; // 양수 (2 이상) 을 두개씩 곱해준다
let arr2 = []; // 음수 (0 포함) 을 두개씩 곱해준다

for (let i = 0; i < n; i++) {
  if (arr[i] === 1) answer += 1;
  else if (arr[i] <= 0) arr2.push(arr[i]);
  else arr1.push(arr[i]);
}

// 절댓값이 큰것들끼리 곱해지는게 유리함
arr1.sort((a, b) => b - a);
arr2.sort((a, b) => a - b);

for (let i = 0; i < arr1.length - 1; i += 2) {
  answer += arr1[i] * arr1[i + 1];
}
if (arr1.length % 2 !== 0) answer += arr1[arr1.length - 1];

for (let i = 0; i < arr2.length - 1; i += 2) {
  answer += arr2[i] * arr2[i + 1];
}
if (arr2.length % 2 !== 0) answer += arr2[arr2.length - 1];

console.log(answer);
// }
