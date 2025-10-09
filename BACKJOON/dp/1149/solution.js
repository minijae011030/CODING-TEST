const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

let cost = [];
for (let i = 0; i < n; i++) {
  cost.push(input[i + 1].split(" ").map(Number));
}

let dp = Array.from({ length: n }, () => Array(3).fill(0));

dp[0] = cost[0];

for (let i = 1; i < n; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
}

console.log(Math.min(...dp[n - 1]));
