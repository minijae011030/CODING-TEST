const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const dp = Array(12).fill(0);
dp[1] = 1; // (1)
dp[2] = 2; // (1+1, 2)
dp[3] = 4; // (1+1+1, 1+2, 2+1, 3)

for (let i = 4; i <= 11; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

let result = [];
for (let i = 1; i <= input[0]; i++) result.push(dp[input[i]]);

for (let i = 0; i < result.length; i++) console.log(result[i]);
