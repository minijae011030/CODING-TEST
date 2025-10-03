const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const g = Array.from({ length: N }, (_, i) =>
  input[i + 1].trim().split(" ").map(Number)
);

let ans = 1,
  best = -1;
for (let i = 0; i < N; i++) {
  // 학생 수만큼 반복
  let cnt = 0;
  for (let j = 0; j < N; j++) {
    if (i !== j) {
      // 같은 사람이 아니면
      for (let y = 0; y < 5; y++) {
        // 1~5학년 반복
        if (g[i][y] === g[j][y]) {
          cnt++;
          break; // 한 학생과 다른 학생이 같은반이었던 적이 있으면 카운트는 1번만 증가
        }
      }
    }
  }

  if (cnt > best) {
    best = cnt;
    ans = i + 1;
  }
}
console.log(ans);
