const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
let arr = [];
for (let i = 1; i <= N; i++) arr.push(input[i].split("").map(Number));

let max = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    for (let k = 1; i + k < N && j + k < M; k++) {
      const a = arr[i][j];
      const b = arr[i + k][j];
      const c = arr[i][j + k];
      const d = arr[i + k][j + k];

      if (a === b && a === c && a === d) {
        max = Math.max(max, k + 1);
      }
    }
  }
}

console.log(max ** 2);
