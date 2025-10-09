const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

let s = [0];
for (let i = 0; i < n; i++) {
  s.push(Number(input[i + 1]));
}

let dp = Array.from({ length: n + 1 }).fill(0);
dp[0] = 0;
dp[1] = s[1];
dp[2] = s[2] + s[1];
dp[3] = Math.max(s[1] + s[3], s[2] + s[3]);

for (let i = 4; i <= n; i++) {
  dp[i] = Math.max(s[i] + s[i - 1] + dp[i - 3], s[i] + dp[i - 2]);
}

console.log(dp[n]);
