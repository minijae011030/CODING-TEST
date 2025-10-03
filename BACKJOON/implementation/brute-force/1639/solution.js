const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const ticket = input[0];
const n = ticket.length / 2;
let max_len = 0;
for (let len = 1; len <= n; len++) {
  for (let i = 0; i < 2 * n - 2 * len + 1; i++) {
    if (
      getSum(ticket.slice(i, i + len)) ===
      getSum(ticket.slice(i + len, i + 2 * len))
    ) {
      max_len = Math.max(max_len, 2 * len);
    }
  }
}

console.log(max_len);

function getSum(n) {
  const nArr = Array.from(String(n), Number);
  const answer = nArr.reduce((prev, curr) => prev + curr, 0);
  return answer;
}
