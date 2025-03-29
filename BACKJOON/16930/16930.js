const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ").map(Number);
const gym = input.splice(0, N).map((line) => line.split(""));
const [x1, y1, x2, y2] = input
  .shift()
  .split(" ")
  .map((v) => Number(v) - 1);

const visited = Array.from({ length: N }, () => Array(M).fill(Infinity));
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const queue = [];
queue.push([x1, y1]);
visited[x1][y1] = 0;

let start = 0;
while (start < queue.length) {
  const [x, y] = queue[start++];
  const time = visited[x][y];

  for (let [dx, dy] of directions) {
    for (let i = 1; i <= K; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;

      // 범위 밖 or 벽이면 break
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) break;
      if (gym[nx][ny] === "#") break;

      // 이미 현재 시간보다 빠르게 방문한 경우는 더 이상 안 봐도 됨
      if (visited[nx][ny] < time + 1) break;

      if (visited[nx][ny] === Infinity) {
        visited[nx][ny] = time + 1;
        queue.push([nx, ny]);
      }
    }
  }
}

const result = visited[x2][y2] === Infinity ? -1 : visited[x2][y2];
console.log(result);
