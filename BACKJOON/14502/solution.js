const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let [N, M] = input[idx++].split(" ").map(Number);
let maze = Array.from({ length: N }, () => []);
let maxSafe = 0;
for (let i = 0; i < N; i++) {
  maze[i].push(...input[idx++].split(" "));
}

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let blank = [];
let virus = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (maze[i][j] == "0") blank.push([i, j]);
    if (maze[i][j] == "2") virus.push([i, j]);
  }
}

function getCombination(arr, k) {
  const result = [];
  function backtrack(start, combo) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      backtrack(i + 1, combo);
      combo.pop();
    }
  }
  backtrack(0, []);
  return result;
}
const wallCombinations = getCombination(blank, 3);

for (let walls of wallCombinations) {
  const copieMaze = maze.map((row) => [...row]);

  for (let [x, y] of walls) {
    copieMaze[x][y] = "1";
  }

  const queue = [...virus];
  let front = 0;

  while (front < queue.length) {
    const [x, y] = queue[front++];

    for (let dir of direction) {
      const dx = x + dir[0];
      const dy = y + dir[1];

      if (dx >= 0 && dx < N && dy >= 0 && dy < M && copieMaze[dx][dy] == "0") {
        copieMaze[dx][dy] = "2";
        queue.push([dx, dy]);
      }
    }
  }

  let safeCount = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (copieMaze[i][j] == "0") safeCount++;
    }
  }

  if (safeCount > maxSafe) maxSafe = safeCount;
}

console.log(maxSafe);
