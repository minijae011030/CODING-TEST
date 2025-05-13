const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let [N, M, G] = input[idx++].split(" ").map(Number);

// 활동 영역 지도
const map = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  map[i] = input[idx++].split(" ").map(Number);
}

let [x, y] = input[idx++].split(" ").map((n) => Number(n) - 1);

// 승객 위치
const passengers = [];
for (let i = 0; i < M; i++) {
  const [x, y, dx, dy] = input[idx++].split(" ").map((n) => Number(n) - 1);
  passengers.push({ x, y, dx, dy });
}

// ====================================================

const direction = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

// 현재 택시 위치에서 가장 가까운 승객 찾기
function findHighestPriorityPassenger(x, y) {
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  let queue = [[x, y, 0]];
  visited[x][y] = true;
  let candidates = [];

  let minDist = Infinity;

  while (queue.length > 0) {
    const [cx, cy, d] = queue.shift();

    if (d > minDist) break; // 이미 최단 거리를 넘으면 중단

    for (let i = 0; i < passengers.length; i++) {
      let passenger = passengers[i];
      if (passenger.x === cx && passenger.y === cy) {
        candidates.push([i, cx, cy, d]); // 후보자 리스트에 삽입
        minDist = d;
      }
    }

    for (dir of direction) {
      let [nx, ny] = [cx + dir[0], cy + dir[1]];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (map[nx][ny] === 1 || visited[nx][ny]) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny, d + 1]);
    }
  }

  if (candidates.length === 0) return null;

  // 정렬: 행 번호 -> 열 번호
  candidates.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });

  return candidates[0]; // [index, x, y, dist]
}

// 목적지까지 거리 구하기
function calcDistToDestination(x, y, dx, dy) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = [[x, y, 0]];
  visited[x][y] = true;

  while (queue.length > 0) {
    const [cx, cy, d] = queue.shift();
    if (cx === dx && cy === dy) return d;

    for (const [dx2, dy2] of direction) {
      const nx = cx + dx2,
        ny = cy + dy2;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (map[nx][ny] === 1 || visited[nx][ny]) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny, d + 1]);
    }
  }

  return -1;
}

// ====================================================

for (let i = 0; i < M; i++) {
  const found = findHighestPriorityPassenger(x, y);
  if (!found) return console.log(-1);

  const [index, px, py, distToPassenger] = found;
  if (G < distToPassenger) return console.log(-1);

  G -= distToPassenger;

  const passenger = passengers[index];
  passengers.splice(index, 1);

  const distToDestination = calcDistToDestination(
    passenger.x,
    passenger.y,
    passenger.dx,
    passenger.dy
  );
  if (distToDestination === -1 || G < distToDestination) return console.log(-1);

  G += distToDestination;
  x = passenger.dx;
  y = passenger.dy;
}

console.log(G);
