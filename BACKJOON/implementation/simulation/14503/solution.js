const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 로봇 청소기
 *
 * n x m 직사각형
 * 각 칸은 벽 또는 빈칸
 *
 * 청소기는 바라보는 방향이 있음 (동, 서, 남, 북)
 *
 * 칸은 좌표 (r, c)
 * 가장 북쪽 줄, 서쪽 칸 (0, 0)
 * 가장 남쪽 줄, 동쪽 칸 (n-1, m-1)
 *
 * (0, 0)
 * vㅁㅁㅁㅁㅁ
 * ㅁㅁㅁㅁㅁㅁ
 * ㅁㅁㅁㅁㅁㅁ
 * ㅁㅁㅁㅁㅁv (n-1, m-1)
 *
 * 1. 현재 칸이 아직 청소되지 않은 경우 현재 칸 청소
 * 2. 현재 칸 주변 4칸 중 청소되지 않은 칸이 없는 경우
 *    2-1. 바라보는 방향 유지한 채로 한칸 후진 후에 1번으로 돌아감
 *    2-2. 바라보는 방향 뒤쪽 칸이 벽이면 작동 멈춤
 * 3. 현재 칸 주변 4칸 중 청소되지 않은 칸이 있는 경우
 *    3-1. 반시계 방향으로 90도 회전
 *    3-2. 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않은 빈 칸인 경우 전진
 *    3-3. 1번으로 돌아감
 *
 * 0 -> 청소되지 않은 빈칸
 * 1 -> 벽
 *
 * 방향: 0북, 1동, 2남, 3서
 *
 * 북0 -> 서3
 * 동1 -> 북0
 * 남2 -> 동1
 * 서3 -> 남2
 *
 * (x + 3) % 4
 */

let idx = 0;
let [n, m] = input[idx++].split(" ").map(Number);
let [r, c, d] = input[idx++].split(" ").map(Number);

let map = [];
for (let i = 0; i < n; i++) map.push(input[idx++].split(" ").map(Number));

let direction = [
  [-1, 0], // 북
  [0, 1], // 동
  [1, 0], // 남
  [0, -1], // 서
];

let answer = 0;

function cleanupSolution() {
  // 현재 칸이 아직 청소되지 않은 경우
  if (map[r][c] === 0) {
    map[r][c] = 2;
    answer++;
  }

  // 주변 네 칸 중 청소된 칸 찾기
  let around = findAround(r, c);

  // 청소되지 않은 빈 칸이 있는 경우
  if (around > 0) {
    // 반시계 방향 회전
    for (let i = 0; i < 4; i++) {
      d = (d + 3) % 4;
      let [nx, ny] = [r + direction[d][0], c + direction[d][1]];

      if (map[nx][ny] === 0) {
        r = nx;
        c = ny;
      }

      return cleanupSolution();
    }
  }

  // 청소되지 않은 빈 칸이 없는 경우
  // 후진 후 돌아가기
  let [bx, by] = goBack(r, c, d);
  if (bx >= 0 && bx < n && by >= 0 && by < m && map[bx][by] !== 1) {
    r = bx;
    c = by;
    return cleanupSolution();
  }

  return answer;
}

console.log(cleanupSolution());

function findAround(r, c) {
  let around = 0;
  for (let [dx, dy] of direction) {
    let [nx, ny] = [r + dx, c + dy];
    if (nx >= 0 && nx < n && ny >= 0 && ny < m && map[nx][ny] === 0) around++;
  }
  return around;
}

function goBack(r, c, d) {
  let [br, bc] = [r, c];

  if (d === 0) {
    br += 1;
  } else if (d === 1) {
    bc -= 1;
  } else if (d === 2) {
    br -= 1;
  } else {
    bc += 1;
  }

  return [br, bc];
}
