const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);
let matrix = input[1].split(" ").map(Number);

let prefixSum = [0];
for (let i = 0; i < N; i++) {
  prefixSum[i + 1] = prefixSum[i] + matrix[i];
}

let max = -Infinity;
for (let i = 0; i <= N - K; i++) {
  max = Math.max(max, prefixSum[i + K] - prefixSum[i]);
}

console.log(max);
