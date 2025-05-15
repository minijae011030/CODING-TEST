const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let matrix = input[1].split(" ").map(Number);
let prefixSum = [0];
for (let i = 0; i < N; i++) {
  prefixSum[i + 1] = matrix[i] + prefixSum[i];
}

let answer = 0;
for (let i = 0; i <= N; i++) {
  for (let j = i; j <= N; j++) {
    if (prefixSum[j] - prefixSum[i - 1] === M) answer++;
  }
}

console.log(answer);
