const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let map = [];
let res = [];
let visited = Array.from({ length: n }, () => Array(n).fill(0));
for (let i = 0; i < n; i++) {
  map.push(input[i + 1].split("").map(Number));
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j] && map[i][j] === 1) {
      res.push(1);
      visited[i][j] = 1;
      dfs(i, j, res.length - 1);
    }
  }
}

function dfs(x, y, area) {
  for (let dir of direction) {
    let [nx, ny] = [x + dir[0], y + dir[1]];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < n &&
      ny < n &&
      !visited[nx][ny] &&
      map[nx][ny] === 1
    ) {
      visited[nx][ny] = 1;
      res[area]++;
      dfs(nx, ny, area);
    }
  }
}

console.log(res.length);
console.log(res.sort((a, b) => a - b).join("\n"));
