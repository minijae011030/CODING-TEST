const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let S = Number(input[0]);

let sum = 0;
let cnt = 0;

for (let i = 1; ; i++) {
  sum += i;
  cnt++;

  if (sum > S) {
    cnt--;
    break;
  }
}

console.log(cnt);
