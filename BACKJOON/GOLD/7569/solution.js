const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, H] = input[0].split(" ").map(Number);
let tomato = [];

let idx = 1;
for (let i = 0; i < H; i++) {
  let arr = [];
  for (let j = 0; j < M; j++) {
    arr.push(input[idx++].split(" ").map(Number));
  }
  tomato.push(arr);
}

const directions = [
  [0, -1, 0],
  [0, 1, 0],
  [-1, 0, 0],
  [1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];
let queue = [];
let zeroCnt = 0;
for (let i = 0; i < H; i++) {
  for (let j = 0; j < M; j++) {
    for (let k = 0; k < N; k++) {
      if (tomato[i][j][k] === 1) {
        queue.push([k, j, i, 0]);
      }
      if (tomato[i][j][k] === 0) {
        zeroCnt++;
      }
    }
  }
}

if (zeroCnt === 0) {
  console.log(0);
  return;
}

let MAX = 0;
let head = 0;
while (head < queue.length) {
  let [x, y, z, day] = queue[head++];
  if (day > MAX) MAX = day;
  for (let dir of directions) {
    let [dx, dy, dz] = [x + dir[0], y + dir[1], z + dir[2]];
    if (
      dx >= 0 &&
      dx < N &&
      dy >= 0 &&
      dy < M &&
      dz >= 0 &&
      dz < H &&
      tomato[dz][dy][dx] == 0
    ) {
      tomato[dz][dy][dx] = 1;
      queue.push([dx, dy, dz, day + 1]);
    }
  }
}

let unRipeCnt = 0;
for (let i = 0; i < H; i++) {
  for (let j = 0; j < M; j++) {
    for (let k = 0; k < N; k++) {
      if (tomato[i][j][k] === 0) {
        unRipeCnt++;
      }
    }
  }
}
if (unRipeCnt) console.log(-1);
else console.log(MAX);
