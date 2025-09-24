const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let arr = new Array({ length: M }, () => []);
let visited = Array.from({ length: M }, () => Array(M).fill(false));

let Warea = 0;
let Barea = 0;

for (let i = 0; i < M; i++) {
  arr[i] = input[i + 1].split("");
}

let dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      let queue = [[i, j]];
      DFS(i, j, arr[i][j], queue);
      if (arr[i][j] === "W") Warea += queue.length ** 2;
      else Barea += queue.length ** 2;
    }
  }
}

console.log(Warea, Barea);

function DFS(i, j, state, queue) {
  visited[i][j] = true;
  for (d of dir) {
    let [nx, ny] = [d[0] + i, d[1] + j];

    if (nx >= 0 && ny >= 0 && nx < M && ny < N && state === arr[nx][ny]) {
      if (!visited[nx][ny]) {
        DFS(nx, ny, state, queue);
        queue.push([nx, ny]);
      }
    }
  }
}
