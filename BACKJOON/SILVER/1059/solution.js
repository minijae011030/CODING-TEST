const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const L = Number(input[0]);
let S = input[1].split(" ").map(Number);
const n = Number(input[2]);

S.sort((a, b) => a - b);

function solution() {
  if (S.includes(n)) return 0;

  let l = 0;
  let r = null;

  for (let i = 0; i < S.length; i++) {
    if (S[i] > n) {
      r = S[i];
      l = i > 0 ? S[i - 1] : 0;
      break;
    }
  }

  return (n - l) * (r - n) - 1;
}

console.log(solution());
