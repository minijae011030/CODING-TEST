const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 상담 퇴사
 * N+1일째 되는 날 퇴사
 * 남은 N일동안 최대한 많은 상담
 * 하루에 하나씩 서로 다른 사람의 상담
 * 상담을 완료하는데 걸리는 기간 Ti, 상담 했을때 받을 수 있는 금액 Pi
 *
 * 상담 적절히 했을때 최대 수익
 */

let idx = 0;
let n = Number(input[idx++]); // n+1일째 되는 날 퇴사
let arr = [];

for (let i = 0; i < n; i++) {
  let [t, p] = input[idx++].split(" ").map(Number);

  if (i + t > n) p = 0;
  arr.push([t, p]);
}

let dp = new Array(n + 1).fill(0);
/**
 * a일의 최대: a일 + math.max(a 전일)
 * 이전꺼 날짜 봐가면서 제일 적은거? 제일 짧은거?
 */

// for (let i = 1; i < n; i++) {
//   let last = 0;
//   for (let j = i - 1; j >= 0; j--) {
//     // 상담 가능한 날짜
//     if (i - j >= arr[j][0]) {
//       last = Math.max(last, dp[j]);
//     }
//   }
//   dp[i] += last;
// }

let maxVal = 0;
for (let i = 0; i < n; i++) {
  maxVal = Math.max(dp[i], maxVal);

  let [t, p] = arr[i];

  if (i + t <= n) {
    dp[i + t] = Math.max(dp[i + t], maxVal + p);
  }
}

console.log(Math.max(maxVal, dp[n]));
