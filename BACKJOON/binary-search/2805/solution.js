const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

let s = 0;
let e = Math.max(...trees);
let ans = 0;
while (s <= e) {
  let mid = Math.floor((s + e) / 2);
  const sum = calcSlicedTree(mid);
  if (sum >= M) {
    ans = mid;
    s = mid + 1;
  } else {
    e = mid - 1;
  }
}
console.log(ans);

function calcSlicedTree(h) {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += trees[i] - h > 0 ? trees[i] - h : 0;
  }

  return sum;
}
