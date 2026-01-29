const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = Number(input[0]);
let arr = [];
for (let i = 1; i <= n; i++) arr.push(input[i].split(" ").map(Number));

/**
 * 가장 최선의 선택 -> 종료시간이 빠른거
 * 종료시간이 똑같다? -> 시작시간이 빠른거
 */
arr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let a = [arr[0]];
for (let i = 1; i < n; i++) {
  if (a[a.length - 1][1] <= arr[i][0]) a.push(arr[i]);
}

console.log(a.length);
