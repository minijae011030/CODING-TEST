const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let [N, M, G] = input[idx++].split(" ").map(Number); // 활동 영역: N x N, M명의 승객, 초기 가스 G

let map = Array.from({ length: N }, () => []); // 활동 영역 지도
let passengers = []; // 승객의 출발지의 행과 열 번호, 목적지의 행과 열 번호, 거리

for (let i = 0; i < N; i++) {
  map[i] = input[idx++].split(" ").map(Number);
}

let [x, y] = input[idx++]
  .split(" ")
  .map(Number)
  .map((prev) => prev - 1); // 운전을 시작하는 칸의 행 번호 x, 열 번호 y

for (let i = 0; i < M; i++) {
  passengers.push(
    input[idx++]
      .split(" ")
      .map(Number)
      .map((prev) => prev - 1)
  );
}

// ==================================================

function getDistancesFromTaxi(sx, sy) {
  const dist = Array.from({ length: N }, () => Array(N).fill(-1));
  const queue = [[sx, sy]];
  dist[sx][sy] = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let dir of direction) {
      const [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        map[nx][ny] === 0 &&
        dist[nx][ny] === -1
      ) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return dist;
}

function calcDist(tx, ty, px, py) {
  let queue = [[tx, ty, 0]];
  let visited = Array.from({ length: N }, () => Array(N).fill(0));
  visited[tx][ty] = 1;

  while (queue.length > 0) {
    let [x, y, dist] = queue.shift();
    if (x === px && y === py) return dist;

    for (let dir of direction) {
      let [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited[nx][ny] &&
        map[nx][ny] === 0
      ) {
        visited[nx][ny] = 1;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return -1;
}

function orderPassenger() {
  const distMap = getDistancesFromTaxi(x, y);

  passengers.forEach((p) => {
    p[4] = distMap[p[0]][p[1]];
  });

  passengers.sort((a, b) => {
    if (a[4] !== b[4]) return a[4] - b[4];
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });
}

// ==================================================

// 승객의 개수만큼 반복
while (passengers.length > 0) {
  orderPassenger();
  let passenger = passengers.shift();

  // 운전사 -> 승객
  let distToPassenger = passenger[4];
  if (distToPassenger > G || distToPassenger === -1) {
    // 가스 부족으로 실패
    return console.log(-1);
  }
  G -= distToPassenger;

  // 선택된 첫 번째 승객에 대해서만 목적지 거리 계산

  // 승객 -> 목적지
  let distToDestination = calcDist(
    passenger[0],
    passenger[1],
    passenger[2],
    passenger[3]
  );

  if (distToDestination > G || distToDestination === -1) {
    // 가스 부족으로 실패
    return console.log(-1);
  }
  [x, y] = [passenger[2], passenger[3]];
  G += distToDestination; // 성공 시 승객을 태워 이동하면서 소모한 연료 양의 두배가 충전
}

return console.log(G);
