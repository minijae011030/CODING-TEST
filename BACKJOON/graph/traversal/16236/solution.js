const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 아기상어
 *
 * NxN 크기에 물고기 M마리와 아기상어 1마리
 * 한칸에는 물고기 ㅚ대 한마리
 *
 * 아기상어 처음 크기: 2
 * 아기상어 1초에 상하좌우로 인접한 한칸씩 이동
 *
 * 아기상어는 자신보다 큰 물고기가 있는 칸 지나갈수없음
 * 자기랑 크기가 같은 물고기는 지나가기만
 * 자기보다 작은 물고기 먹을수있음
 *
 * 더이상 먹을수있는 물고기가 없으면 종료
 * 먹을수있는 물고기 한마리 -> 먹으러감
 *
 * 거리 -> 상어=>물고기 이동시 지나야하는 칸의 개수
 * 더 많으면 -> 가장 가까이에 있는 물고기 먹으러감
 * 가까이 있는 물고기가 여러개이면 -> 가장 위에 -> 왼쪽에 있는 물고기 먹음
 *
 * 아기상어가 물고기 칸으로 이동 시, 이동과 동시에 먹음 -> 칸 빈칸
 *
 * 자신의 크기와 같은 수의 물고기를 먹을때마다 크기 1씩 증가
 *
 * 종료때까지 몇초가 걸릴까?
 */
let idx = 0;
let N = Number(input[idx++]);
let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[idx++].split(" ").map(Number));
}

let direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let answer = 0;

let start = [];
let eat = 0; // 상어가 먹은 물고기 수
let size = 2; // 상어 사이즈

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 9) {
      start = [i, j];
      map[i][j] = 0;
    }
  }
}

// 먹을 수 있는 물고기가 없을 때까지 실행
while (1) {
  let fish = bfs(start[0], start[1]);
  if (!fish) break;

  let [fx, fy, fdist] = fish;

  start = [fx, fy];
  map[fx][fy] = 0;
  answer += fdist;

  eat++;
  if (eat === size) {
    size++;
    eat = 0;
  }
}

console.log(answer);

function bfs(x, y) {
  let queue = [[x, y]];
  let dists = Array.from({ length: N }, () => Array(N).fill(-1));
  let qIdx = 0;

  dists[x][y] = 0;
  let availableFish = [];

  while (queue.length > qIdx) {
    let [x, y] = queue[qIdx++];

    for (let dir of direction) {
      let [nx, ny] = [x + dir[0], y + dir[1]];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (dists[nx][ny] !== -1) continue;
      if (map[nx][ny] > size) continue;

      dists[nx][ny] = dists[x][y] + 1;
      if (map[nx][ny] < size && map[nx][ny] > 0) {
        availableFish.push([nx, ny, dists[nx][ny]]);
      }

      queue.push([nx, ny]);
    }
  }

  if (availableFish.length === 0) return null;

  availableFish.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2];
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  // 먹을 수 있는 물고기 리턴 [x, y, dist]
  return availableFish[0];
}
