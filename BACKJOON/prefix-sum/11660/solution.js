const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let prefixSum = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

let matrix = [];
for (let i = 0; i < N; i++) {
  matrix.push(input[i + 1].split(" ").map(Number));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    prefixSum[i + 1][j + 1] =
      matrix[i][j] +
      prefixSum[i][j + 1] +
      prefixSum[i + 1][j] -
      prefixSum[i][j];
  }
}

for (let i = 0; i < M; i++) {
  let [x1, y1, x2, y2] = input[i + N + 1].split(" ").map(Number);
  console.log(
    prefixSum[x2][y2] -
      prefixSum[x1 - 1][y2] -
      prefixSum[x2][y1 - 1] +
      prefixSum[x1 - 1][y1 - 1]
  );
}
