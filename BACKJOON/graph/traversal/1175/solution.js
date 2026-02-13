const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split(""));
}

let s;
let c = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "S") s = [i, j];
    if (map[i][j] === "C") c.push([i, j]);
  }
}

/**
 * queue에 들어가는 상태
 * [x, y, dir, mask, dist]
 * visited [x][y][dir][mask]
 *
 * mask: C 두개 방문 처리 비트마스크
 * 00 (0) 둘다 방문 x
 * 01 (1) c[0] 방문
 * 10 (2) c[1] 방문
 * 11 (3) c[0], c[1] 방문
 *
 * dir: 방향
 * 0: 위쪽
 * 1: 아래쪽
 * 2: 왼쪽
 * 3: 오른쪽
 */

let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: 4 }, () => Array(4).fill(0)),
  ),
);

let queue = [[s[0], s[1], -1, 0, 0]];
let idx = 0;

while (queue.length > idx) {
  let [x, y, dir, mask, dist] = queue[idx++];

  let newMask = mask;

  if (x === c[0][0] && y === c[0][1]) newMask = mask | 1; // 01
  if (x === c[1][0] && y === c[1][1]) newMask = mask | 2; // 10

  if (newMask === 3) return console.log(dist);

  for (let i = 0; i < 4; i++) {
    if (dir !== i) {
      if (
        i === 0 &&
        x - 1 >= 0 &&
        !visited[x - 1][y][i][newMask] &&
        map[x - 1][y] !== "#"
      ) {
        // 위로이동
        visited[x - 1][y][i][newMask] = 1;
        queue.push([x - 1, y, i, newMask, dist + 1]);
      }
      if (
        i === 1 &&
        x + 1 < N &&
        !visited[x + 1][y][i][newMask] &&
        map[x + 1][y] !== "#"
      ) {
        // 아래로이동
        visited[x + 1][y][i][newMask] = 1;
        queue.push([x + 1, y, i, newMask, dist + 1]);
      }
      if (
        i === 2 &&
        y - 1 >= 0 &&
        !visited[x][y - 1][i][newMask] &&
        map[x][y - 1] !== "#"
      ) {
        // 왼쪽이동
        visited[x][y - 1][i][newMask] = 1;
        queue.push([x, y - 1, i, newMask, dist + 1]);
      }
      if (
        i === 3 &&
        y + 1 < M &&
        !visited[x][y + 1][i][newMask] &&
        map[x][y + 1] !== "#"
      ) {
        // 오른쪽이동
        visited[x][y + 1][i][newMask] = 1;
        queue.push([x, y + 1, i, newMask, dist + 1]);
      }
    }
  }
}

console.log(-1);
