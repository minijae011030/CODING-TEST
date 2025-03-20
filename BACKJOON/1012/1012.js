const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = input.shift();

for (let i = 0; i < T; i++) {
  let answer = 0;
  let [M, N, K] = input.shift().split(" ").map(Number);
  let array = Array.from({ length: N }, () => Array(M).fill(0));

  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let j = 0; j < K; j++) {
    let [x, y] = input.shift().split(" ").map(Number);
    array[y][x] = 1;
  }

  let visited = Array.from({ length: N }, () => Array(M).fill(0));

  for (let j = 0; j < M; j++) {
    for (let k = 0; k < N; k++) {
      if (array[k][j] && !visited[k][j]) {
        answer++;
        DFS(k, j);
      }
    }
  }

  console.log(answer);

  function DFS(x, y) {
    if (x >= 0 && x < N && y >= 0 && y < M && !visited[x][y] && array[x][y]) {
      visited[x][y] = 1;
      for (d of dir) {
        const [dx, dy] = [d[0] + x, d[1] + y];
        DFS(dx, dy);
      }
    }
  }
}
