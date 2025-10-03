const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input[0]);
const arr = [];
for (let i = 0; i < T; i++) arr.push(Number(input[i + 1]));

const max_value = Math.max(...arr);
let computedArr = [
  [1, 0],
  [0, 1],
];

for (let i = 2; i <= max_value; i++) {
  computedArr.push([
    computedArr[i - 1][0] + computedArr[i - 2][0],
    computedArr[i - 1][1] + computedArr[i - 2][1],
  ]);
}

for (let idx of arr) console.log(computedArr[idx][0], computedArr[idx][1]);
