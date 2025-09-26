const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [X, Y] = input[0].split(" ").map(Number);

const Z = Math.floor((Y * 100) / X);

function solution() {
  if (Z >= 99) {
    return -1;
  }

  // k번 더 했을때 승률이 변하는 최소 k

  let left = 1; // 가능한 k의 최소 범위
  let right = 1e9; // 가능한 k의 최대 범위
  let ans = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 가운데 값 (만약 게임을 mid번 하면 승률이 변할까?)
    const newZ = Math.floor(((Y + mid) * 100) / (X + mid));
    if (newZ > Z) {
      // 승률이 올랐다
      ans = mid;
      right = mid - 1; // 더 작은 값으로 탐색해보자
    } else {
      // 승률이 변하지 않았다
      left = mid + 1; // 더 높은 값으로 탐색해보자
    }
  }

  return ans;
}

console.log(solution());
