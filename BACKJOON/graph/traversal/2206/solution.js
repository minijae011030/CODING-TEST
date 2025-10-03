const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let [N, M] = input[idx++].split(" ").map(Number);

let map = [];
let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [0, 0])
);

for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split("").map(Number));
}

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let queue = [[0, 0, 0, 1]]; // x, y, used, distance
visited[0][0][0] = 1;

let head = 0;
while (queue.length > head) {
  let [x, y, used, dist] = queue[head++];

  if (x === N - 1 && y === M - 1) return console.log(dist);
  for (let dir of direction) {
    let [dx, dy] = [x + dir[0], y + dir[1]];

    if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;

    if (map[dx][dy] === 0 && !visited[dx][dy][used]) {
      visited[dx][dy][used] = 1;
      queue.push([dx, dy, used, dist + 1]);
    }

    if (map[dx][dy] === 1 && !used && !visited[dx][dy][1]) {
      visited[dx][dy][1] = 1;
      queue.push([dx, dy, 1, dist + 1]);
    }
  }
}

return console.log(-1);
