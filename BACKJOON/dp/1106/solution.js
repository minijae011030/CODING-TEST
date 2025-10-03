const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [C, N] = input[0].split(" ").map(Number);
const LIMIT = C + 100;

let items = [];
let dp = Array.from({ length: LIMIT + 1 }).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < N; i++) {
  const [cost, gain] = input[i + 1].split(" ").map(Number);
  items.push([cost, gain]);
}

for (let [cost, gain] of items) {
  for (let t = 0; t < LIMIT; t++) {
    if (dp[t] !== Infinity) {
      dp[t + gain] = Math.min(dp[t + gain], dp[t] + cost);
    }
  }
}

let ans = Infinity;
for (let i = C; i < LIMIT; i++) {
  ans = Math.min(ans, dp[i]);
}

console.log(ans);
