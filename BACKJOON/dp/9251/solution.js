const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 현재 비교하고있는 두 문자열이 같다면
 *  dp[i][j] = dp[i-1][j-1] + 1
 *
 * 현재 비교하고있는 두 문자열이 다르다면
 *  dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 */

const word1 = input[0];
const word2 = input[1];

let dp = Array.from({ length: word1.length + 1 }, () =>
  Array(word2.length + 1)
);

for (let i = 0; i <= word1.length; i++) {
  dp[i][0] = 0;
}

for (let j = 0; j <= word2.length; j++) {
  dp[0][j] = 0;
}

for (let i = 1; i <= word1.length; i++) {
  for (let j = 1; j <= word2.length; j++) {
    if (word1.charAt(i - 1) === word2.charAt(j - 1))
      dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

console.log(dp[word1.length][word2.length]);
