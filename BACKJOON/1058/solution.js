const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split(""));
}

let maxCnt = 0;
for (let i = 0; i < N; i++) {
  let visited = Array(N).fill(0);
  let queue = [[i, 0]];
  visited[i] = 1;

  while (queue.length > 0) {
    let [cur, depth] = queue.shift();
    if (depth === 2) continue;

    for (let next = 0; next < N; next++) {
      if (map[cur][next] === "Y" && !visited[next]) {
        queue.push([next, depth + 1]);
        visited[next] = 1;
      }
    }
  }

  const cnt = visited.filter((v, idx) => v && idx !== i).length;
  maxCnt = Math.max(cnt, maxCnt);
}
console.log(maxCnt);
