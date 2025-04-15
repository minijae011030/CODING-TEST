const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let [N, M] = input[idx++].split(" ").map(Number);

let map = Array.from({ length: N }, () => []);

for (let i = 0; i < N; i++) {
  map[i].push(...input[idx++].split("").map(Number));
}

let walls = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] == 1) walls.push([i, j]);
  }
}

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let minDistance = Infinity;
let visited = Array.from({ length: N }, () => Array(M).fill(0));
let queue = [[0, 0, 1]];
let start = 0;

for (let k = 0; k < walls.length; k++) {
  visited = Array.from({ length: N }, () => Array(M).fill(0));
  queue = [[0, 0, 1]];
  start = 0;

  let breakwall = walls[k];
  map[breakwall[0]][breakwall[1]] = 0;

  while (start < queue.length) {
    let [x, y, distance] = queue[start++];

    if (x == N - 1 && y == M - 1) {
      minDistance = Math.min(minDistance, distance);
      break;
    }

    for (let dir of direction) {
      let [dx, dy] = [x + dir[0], y + dir[1]];
      if (
        dx >= 0 &&
        dx < N &&
        dy >= 0 &&
        dy < M &&
        !visited[dx][dy] &&
        map[dx][dy] == 0
      ) {
        visited[dx][dy] = 1;
        queue.push([dx, dy, distance + 1]);
      }
    }
  }
  map[breakwall[0]][breakwall[1]] = 1;
}
minDistance == Infinity ? console.log(-1) : console.log(minDistance);
