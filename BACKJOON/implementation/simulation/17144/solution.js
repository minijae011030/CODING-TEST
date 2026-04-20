const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 미세먼지 제거
 * 크기 RxC
 * 공기청정기는 항상 1번 열에 설치 크기는 두 행 차지
 * r,c에 있는 미세먼지의 양은 A(r,c)
 *
 * 1초동안 일어나는 일
 * 1. 미세먼지 확산 (미세먼지가 있는 모든 칸에서 동시에)
 *      - (r, c)에 있는 미세먼지는 인접한 네 뱡항으로 확산
 *      - 인접한 방향에 공.청이 있거나 칸x면 확산 x
 *      - 확산되는 양 [A(r,c)/5], 소수점 버림
 *      - (r, c)에 남은 미.먼 양은 A(r,c) - [A(r,c)/5] * 확산된 방향의 개수
 * 2. 공.청 작동됨
 *      - 공청에서는 바람 나옴
 *      - 위쪽 공청: 반시계방향으로 바람 순환
 *      - 아래쪽 공청: 시계방향으로 바람 순환
 *      - 바람 불면 미먼이 바람 방향대로 한칸씩 이동
 *      - 공청 바람: 미먼 없는 바람, 공청 들어가면: 미멘 없어짐
 *
 * T초 지난 후 방에 남아있는 미먼 양 구하기
 *
 * 공청 설치: -1
 */

let idx = 0;
const [r, c, t] = input[idx++].split(" ").map(Number);
let map = [];
for (let i = 0; i < r; i++) {
  map.push(input[idx++].split(" ").map(Number));
}

// 공기청정기 위치 찾기
let [gx1, gx2] = [];
for (let i = 0; i < r; i++) {
  if (map[i][0] === -1) {
    [gx1, gx2] = [i, i + 1];
    break;
  }
}

let direction = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

for (let i = 0; i < t; i++) {
  // 1. 미.먼 확산
  map = spread();
  // 2. 공.청 작동
  rotateUp();
  rotateDown();
}

let answer = 2;
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    answer += map[i][j];
  }
}

console.log(answer);

function spread() {
  let newMap = Array.from({ length: r }, () => Array(c).fill(0));
  for (let x = 0; x < r; x++) {
    for (let y = 0; y < c; y++) {
      if (map[x][y] === -1) {
        newMap[x][y] = -1;
        continue;
      }
      if (map[x][y] > 0) {
        let amount = Math.floor(map[x][y] / 5);
        let cnt = 0;

        for (let [dx, dy] of direction) {
          let nx = x + dx;
          let ny = y + dy;

          if (nx >= 0 && nx < r && ny >= 0 && ny < c && map[nx][ny] !== -1) {
            newMap[nx][ny] += amount;
            cnt++;
          }
        }

        newMap[x][y] += map[x][y] - amount * cnt;
      }
    }
  }

  return newMap;
}

function rotateUp() {
  // 1. 왼쪽 벽: 위에서 아래로 당기기
  for (let i = gx1 - 1; i > 0; i--) map[i][0] = map[i - 1][0];

  // 2. 위쪽 벽: 오른쪽에서 왼쪽으로 당기기
  for (let i = 0; i < c - 1; i++) map[0][i] = map[0][i + 1];

  // 3. 오른쪽 벽: 아래에서 위로 당기기
  for (let i = 0; i < gx1; i++) map[i][c - 1] = map[i + 1][c - 1];

  // 4. 아래쪽 벽 (공기청정기 행): 왼쪽에서 오른쪽으로 당기기
  for (let i = c - 1; i > 1; i--) map[gx1][i] = map[gx1][i - 1];

  // 공기청정기에서 나가는 바람은 미세먼지 0
  map[gx1][1] = 0;
}

function rotateDown() {
  // 1. 왼쪽 벽: 아래에서 위로 당기기
  for (let i = gx2 + 1; i < r - 1; i++) map[i][0] = map[i + 1][0];

  // 2. 아래쪽 벽: 오른쪽에서 왼쪽으로 당기기
  for (let i = 0; i < c - 1; i++) map[r - 1][i] = map[r - 1][i + 1];

  // 3. 오른쪽 벽: 위에서 아래로 당기기
  for (let i = r - 1; i > gx2; i--) map[i][c - 1] = map[i - 1][c - 1];

  // 4. 위쪽 벽 (공기청정기 행): 왼쪽에서 오른쪽으로 당기기
  for (let i = c - 1; i > 1; i--) map[gx2][i] = map[gx2][i - 1];

  // 공기청정기에서 나가는 바람은 미세먼지 0
  map[gx2][1] = 0;
}
