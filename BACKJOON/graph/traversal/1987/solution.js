const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [r, c] = input[0].split(" ");

let board = [];
for (let i = 0; i < r; i++) {
  board.push(input[i + 1].split(""));
}

const direction = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

let max = 0;
function dfs(x, y, dist) {
  if (max < dist) max = dist;
  if (max === 26) return;

  for (let dir of direction) {
    const [nx, ny] = [x + dir[0], y + dir[1]];

    if (nx >= 0 && nx < r && ny >= 0 && ny < c) {
      const ch = board[nx][ny];
      if (!used[ch]) {
        used[ch] = 1;
        dfs(nx, ny, dist + 1);
        used[ch] = 0;
      }
    }
  }
}

let used = new Array(26).fill(0);
used[board[0][0]] = 1;
dfs(0, 0, 1);

console.log(max);
