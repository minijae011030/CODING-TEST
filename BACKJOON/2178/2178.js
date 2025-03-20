const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
let maze = new Array(N);
let visited = Array.from({ length: N }, () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  maze[i] = input.shift().split("").map(Number);
}

let queue = [[0, 0, 1]]; //[x, y, cnt];
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let start = 0;
while (start < queue.length) {
  const [x, y, cnt] = queue[start++];

  if (x == N - 1 && y == M - 1) {
    console.log(cnt);
    return;
  }

  for (d of dir) {
    const [dx, dy] = [x + d[0], y + d[1]];
    if (
      dx >= 0 &&
      dx < N &&
      dy >= 0 &&
      dy < M &&
      !visited[dx][dy] &&
      maze[dx][dy]
    ) {
      visited[dx][dy] = 1;
      queue.push([dx, dy, cnt + 1]);
    }
  }
}
