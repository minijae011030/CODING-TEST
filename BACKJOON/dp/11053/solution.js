const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  // 현재 원소 arr[i]를 마지막으로 하는 부분수열의 길이를 구한다
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      /**
       * j번째 원소 뒤에 i번째 원소를 붙이면 증가수열이 된다
       * 길이: j에서 끝나는 수열의 길이 + 1
       * dp[j] + 1
       */
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
