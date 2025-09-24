const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input[0]);
let A = input[1].split(" ").map(Number);
let B = input[2].split(" ").map(Number);

const A_sorted = A.sort((a, b) => a - b);
const order = Array.from({ length: N }, (_, i) => i).sort(
  (i, j) => B[j] - B[i]
);

const A_perm = Array(N);

for (let k = 0; k < N; k++) {
  A_perm[order[k]] = A_sorted[k]; // B 큰 자리부터 A 작은 값 배치
}

let S = 0;
for (let i = 0; i < N; i++) S += A_perm[i] * B[i];
console.log(S);
