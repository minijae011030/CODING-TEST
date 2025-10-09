const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

let ropes = [];
for (let i = 0; i < n; i++) {
  ropes.push(Number(input[i + 1]));
}

ropes.sort((a, b) => b - a);

let max = 0;
for (let i = 0; i < n; i++) {
  let k = i + 1;
  let weak_rope = ropes[i];
  max = Math.max(max, k * weak_rope);
}

console.log(max);
