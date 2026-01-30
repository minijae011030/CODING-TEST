const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let [r, c, d] = input[1].split(" ").map(Number);

let room = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  room[i] = input[i + 2].split(" ").map(Number);
}

let cnt = 0;

function cleanSystem(r, c, d) {
  if (room[r][c] === 0) {
    room[r][c] = -1; // 청소하기
    cnt++;
  }

  for (let k = 0; k < 4; k++) {
    d = calcNewDirection(d);
    let [nr, nc] = calcFront(r, c, d);

    if (room[nr][nc] === 0) {
      cleanSystem(nr, nc, d);
      return;
    }
  }

  let [br, bc] = calcBack(r, c, d);
  if (room[br][bc] === 1) return;
  cleanSystem(br, bc, d);
}

cleanSystem(r, c, d);
console.log(cnt);

// 현재 방향을 기반으로 한칸 후진된 좌표 계산
function calcBack(r, c, direction) {
  if (direction === 0) return [r + 1, c];
  if (direction === 1) return [r, c - 1];
  if (direction === 2) return [r - 1, c];
  if (direction === 3) return [r, c + 1];
}

// 현재 방향을 기반으로 한칸 전진된 좌표 계산
function calcFront(r, c, direction) {
  if (direction === 0) return [r - 1, c];
  if (direction === 1) return [r, c + 1];
  if (direction === 2) return [r + 1, c];
  if (direction === 3) return [r, c - 1];
}

// 반시계방향 90도 돌아간 새로운 방향 계산
function calcNewDirection(direction) {
  if (direction === 0) return 3;
  if (direction === 1) return 0;
  if (direction === 2) return 1;
  if (direction === 3) return 2;
}
