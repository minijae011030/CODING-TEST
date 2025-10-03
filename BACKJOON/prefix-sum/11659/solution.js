const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let matrix = input[1].split(" ").map(Number);

const prefixSum = [0];
for (let i = 0; i < N; i++) {
  prefixSum[i + 1] = prefixSum[i] + matrix[i];
}

for (let i = 0; i < M; i++) {
  const [start, end] = input[i + 2].split(" ").map(Number);
  console.log(prefixSum[end] - prefixSum[start - 1]);
}
