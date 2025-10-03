const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input[i + 1].split(" ").map(Number));
}

const dp = new Array(K + 1).fill(0);

for (const [w, v] of arr) {
  for (let t = K; t >= w; t--) {
    dp[t] = Math.max(dp[t], dp[t - w] + v);
  }
}
console.log(dp[K]);
