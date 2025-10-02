const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 항구에는 크레인이 N대 있고, 1분에 박스를 하나씩 배에 실을 수 있음
 * 각 크레인은 무게 제한이 있음
 * 무게제한보다 무거운 박스느 크레인으로 움직일 수 없음
 * 모든 박스를 배로 옮기는 데 드는 시간의 최솟값을 구하는 프로그램 작성
 */

function solution() {
  const N = Number(input[0]);
  const cranes = input[1].split(" ").map(Number);

  const M = Number(input[2]);
  const boxes = input[3].split(" ").map(Number);

  cranes.sort((a, b) => b - a);
  boxes.sort((a, b) => b - a);

  if (boxes[0] > cranes[0]) return -1;

  let minutes = 0;
  let moved = new Array(M).fill(0);
  let moveCnt = 0;

  while (moveCnt < M) {
    minutes++;
    let craneIdx = 0;
    for (let i = 0; i < M && craneIdx < N; i++) {
      if (!moved[i] && cranes[craneIdx] >= boxes[i]) {
        // 옮겨지지 않은 박스이면서 크레인 무게제한보다 박스 무게가 가볍다면
        moved[i] = true;
        moveCnt++;
        craneIdx++;
      }
    }
  }
  return minutes;
}

console.log(solution());
