const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let arr = [];
const N = Number(input[0]);
for (let i = 0; i < N; i++) {
  arr.push(input[i + 1]);
}
arr = arr.sort();
let cnt = N;
for (let i = 0; i < N - 1; i++) {
  if (arr[i + 1].startsWith(arr[i])) cnt--;
}
console.log(cnt);
