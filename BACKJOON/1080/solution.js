const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let A = [];
let B = [];
let cnt = 0;
for (let i = 0; i < N; i++) {
  A.push(input[i + 1].split("").map(Number));
}
for (let i = 0; i < N; i++) {
  B.push(input[i + N + 1].split("").map(Number));
}

if (N < 3 || M < 3) {
  if (comparisonMatrix(A, B)) return console.log(0);
  return console.log(-1);
}

for (let i = 0; i < N - 2; i++) {
  for (let j = 0; j < M - 2; j++) {
    if (A[i][j] != B[i][j]) {
      toggleMatrix(i, j);
      cnt++;
    }
  }
}

if (comparisonMatrix(A, B)) {
  return console.log(cnt);
} else {
  return console.log(-1);
}

function comparisonMatrix(A, B) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (A[i][j] !== B[i][j]) return false;
    }
  }

  return true;
}

function toggle(n) {
  if (n === 0) return 1;
  return 0;
}

function toggleMatrix(i, j) {
  A[i][j] = toggle(A[i][j]);
  A[i][j + 1] = toggle(A[i][j + 1]);
  A[i][j + 2] = toggle(A[i][j + 2]);
  A[i + 1][j] = toggle(A[i + 1][j]);
  A[i + 1][j + 1] = toggle(A[i + 1][j + 1]);
  A[i + 1][j + 2] = toggle(A[i + 1][j + 2]);
  A[i + 2][j] = toggle(A[i + 2][j]);
  A[i + 2][j + 1] = toggle(A[i + 2][j + 1]);
  A[i + 2][j + 2] = toggle(A[i + 2][j + 2]);
}
/**
 * 1. N < 3 또는 M < 3이면 뒤집기를 한번도 못함. 처음부터 A === B 인지 검사. 아니면 -1
 * 2. 그렇지않으면
 * - for i in [0..N-3], for j in [0..M-3] 순서로 순회
 * - A[i][j] != B[i][j]이면 (i, j)를 좌상단으로 하는 3x3 토글, cnt++
 * 3. 전부 끝난 뒤 A와 B를 전체 비교
 * - 같으면 cnt
 * - 다르면 -1
 *
 * A, B 행렬 전체를 비교하는 함수
 * 3x3 크기 행렬 토글하는 함수
 *  */
