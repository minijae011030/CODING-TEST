const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let exp = input[0].split("-");
let sum = [];
for (let i = 0; i < exp.length; i++) {
  sum.push(exp[i].split("+").reduce((a, b) => a + Number(b), 0));
}

let res = sum[0];
for (let i = 1; i < sum.length; i++) {
  res -= sum[i];
}

console.log(res);
