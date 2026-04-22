const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
const n = Number(input[idx++]);

let wineArr = [0];
for (let i = 0; i < n; i++) {
  wineArr.push(Number(input[idx++]));
}

let dp = Array(n + 1).fill(0);
dp[1] = wineArr[1];
dp[2] = wineArr[1] + wineArr[2];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(
    dp[i - 3] + wineArr[i - 1] + wineArr[i],
    dp[i - 2] + wineArr[i],
    dp[i - 1],
  );
}

console.log(dp[n]);
