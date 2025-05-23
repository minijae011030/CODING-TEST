const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split(""));
}

let BIdx, RIdx, OIdx;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "R") RIdx = [i, j];
    if (map[i][j] === "B") BIdx = [i, j];
    if (map[i][j] === "O") OIdx = [i, j];
  }
}

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function move(x, y, dx, dy, map) {
  let count = 0;

  while (map[x + dx][y + dy] !== "#" && map[x][y] !== "O") {
    x += dx;
    y += dy;
    count++;
  }

  return [x, y, count];
}

let queue = [[...RIdx, ...BIdx, 0]];
let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
  )
);

visited[RIdx[0]][RIdx[1]][BIdx[0]][BIdx[1]] = 1;

while (queue.length) {
  let [rx, ry, bx, by, depth] = queue.shift();
  if (depth > 10) return console.log(0);
  if (map[rx][ry] === "O") return console.log(1);

  for (let [dx, dy] of direction) {
    let [nrx, nry, rc] = move(rx, ry, dx, dy, map);
    let [nbx, nby, bc] = move(bx, by, dx, dy, map);

    if (map[nbx][nby] === "O") continue;

    if (nrx === nbx && nry === nby) {
      if (rc > bc) {
        nrx -= dx;
        nry -= dy;
      } else {
        nbx -= dx;
        nby -= dy;
      }
    }

    if (!visited[nrx][nry][nbx][nby]) {
      visited[nrx][nry][nbx][nby] = 1;
      queue.push([nrx, nry, nbx, nby, depth + 1]);
    }
  }
}

return console.log(0);
