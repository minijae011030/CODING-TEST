const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let guitar = [];
for (let i = 0; i < M; i++) {
  guitar.push(input[i + 1].split(" ").map(Number));
}

let Pmin = Infinity;
let Smin = Infinity;

for (let g of guitar) {
  if (Pmin > g[0]) Pmin = g[0];
  if (Smin > g[1]) Smin = g[1];
}

let cost1 = Math.ceil(N / 6) * Pmin;
let cost2 = N * Smin;
let cost3 = Math.floor(N / 6) * Pmin + (N % 6) * Smin;

console.log(Math.min(cost1, cost2, cost3));
/**
 * 패키지 최저가, 낱개 최저가 뽑기
 *
 * 선택지
 * 1. 전부 패키지로 사기: ceil(N/6) * Pmin
 * 2. 전부 낱개로 사기: N * Smin
 * 3. 패키지 + 낱개: (N / 6) * Pmin + (N % 6) * Smin
 *
 * min(1, 2, 3)
 */
