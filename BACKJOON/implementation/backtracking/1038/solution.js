const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

const result = [];

function backtrack(numStr, maxDigit) {
  if (numStr !== "") result.push(Number(numStr));

  for (let i = 0; i < maxDigit; i++) {
    backtrack(numStr + i, i);
  }
}

for (let first = 0; first <= 9; first++) {
  backtrack(String(first), first);
}

result.sort((a, b) => a - b);
console.log(result.length < N ? -1 : result[N]);
