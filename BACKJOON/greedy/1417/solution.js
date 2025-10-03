const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let arr = [];
for (let i = 0; i < N; i++) arr.push(Number(input[i + 1]));

let dasom = arr[0];
const others = arr.slice(1, arr.length);

function solution() {
  if (N === 1) return 0;
  let cnt = 0;
  while (1) {
    if (Math.max(...others) < dasom) return cnt;

    others.sort((a, b) => b - a);
    others[0]--;
    dasom++;
    cnt++;
  }
}

console.log(solution());
