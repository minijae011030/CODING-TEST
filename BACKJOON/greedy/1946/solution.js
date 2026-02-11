const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let n = Number(input[idx++]);

for (let i = 0; i < n; i++) {
  let N = Number(input[idx++]);
  let arr = [];
  for (let j = 0; j < N; j++) {
    arr.push(input[idx++].split(" ").map(Number));
  }

  // 서류 등수를 오름차순으로 정렬
  arr.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  let ans = arr.length;
  let min = arr[0][1];

  for (let i = 1; i < arr.length; i++) {
    // 현재까지의 가장 높은 면접 등수와 현재 지원자의 면접 등수 비교
    min = Math.min(min, arr[i][1]);
    // 현재까지의 가장 높은 면접 등수보다 현재 지원자의 면접 등수가 낮다면 탈락
    if (min < arr[i][1]) ans--;
  }

  console.log(ans);
}
