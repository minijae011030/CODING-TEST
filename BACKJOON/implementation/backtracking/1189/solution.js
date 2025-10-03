const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C, K] = input[0].split(" ").map(Number);
let map = [];
let visited = Array.from({ length: R }, () => Array(C).fill(0));
for (let i = 0; i < R; i++) {
  map.push(input[i + 1].split(""));
}
let ans = 0;
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function DFS(r, c, dist) {
  if (r === 0 && c === C - 1) {
    if (dist === K) ans++;
    return;
  }

  for (let dir of direction) {
    let [nr, nc] = [r + dir[0], c + dir[1]];
    if (
      nr >= 0 &&
      nr < R &&
      nc >= 0 &&
      nc < C &&
      !visited[nr][nc] &&
      map[nr][nc] !== "T"
    ) {
      visited[nr][nc] = 1;
      DFS(nr, nc, dist + 1);
      visited[nr][nc] = 0;
    }
  }
}

visited[R - 1][0] = 1;
DFS(R - 1, 0, 1);
console.log(ans);
