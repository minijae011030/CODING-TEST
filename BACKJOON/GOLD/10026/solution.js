const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

const arr = [];
let visited1 = Array.from({ length: N }, () => Array(N).fill(0));
let visited2 = Array.from({ length: N }, () => Array(N).fill(0));

for (let i = 0; i < N; i++) {
  arr.push(input[i + 1].split(""));
}
let normal = 0,
  odd = 0;

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited1[i][j]) {
      visited1[i][j] = 1;
      normal++;
      DFS(i, j, arr[i][j]);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === "R") arr[i][j] = "G";
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited2[i][j]) {
      visited2[i][j] = 1;
      odd++;
      DFS2(i, j, arr[i][j]);
    }
  }
}

console.log(normal, odd);
function DFS(x, y, color) {
  for (const dir of directions) {
    const [nx, ny] = [x + dir[0], y + dir[1]];
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < N &&
      !visited1[nx][ny] &&
      color === arr[nx][ny]
    ) {
      visited1[nx][ny] = 1;
      DFS(nx, ny, color);
    }
  }
}

function DFS2(x, y, color) {
  for (const dir of directions) {
    const [nx, ny] = [x + dir[0], y + dir[1]];
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < N &&
      !visited2[nx][ny] &&
      color === arr[nx][ny]
    ) {
      visited2[nx][ny] = 1;
      DFS2(nx, ny, color);
    }
  }
}
