const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);

let tomatoArray = new Array(N);
for (let i = 0; i < N; i++) {
  tomatoArray[i] = input[i].split(" ").map(Number);
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let queue = [];
let MAX = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (tomatoArray[i][j] === 1) {
      queue.push([i, j, 0]);
    }
  }
}

let front = 0;
while (front < queue.length) {
  const [x, y, day] = queue[front++];

  MAX = Math.max(MAX, day);
  for (d of dir) {
    const [dx, dy] = [d[0] + x, d[1] + y];
    if (dx >= 0 && dx < N && dy >= 0 && dy < M && tomatoArray[dx][dy] == 0) {
      tomatoArray[dx][dy] = 1;
      queue.push([dx, dy, day + 1]);
    }
  }
}

const hasZero = tomatoArray.some((row) => row.includes(0));
hasZero ? console.log(-1) : console.log(MAX);
