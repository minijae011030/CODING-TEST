const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

let computerGraph = Array.from({ length: N }, () => []);
let sum = [];
for (let i = 0; i < M; i++) {
  const [u, v] = input[i + 1].split(" ").map(Number);
  computerGraph[v - 1].push(u - 1);
}

for (let i = 0; i < N; i++) {
  sum.push(BFS(i));
}

const max = Math.max(...sum);
let max_arr = [];
for (let i = 0; i < sum.length; i++) {
  if (sum[i] === max) max_arr.push(i + 1);
}

console.log(max_arr.join(" "));

function BFS(start) {
  let visited = Array.from({ length: N }).fill(0);
  let head = 0;
  let queue = [start];
  visited[start] = 1;
  let cnt = 1;

  while (head < queue.length) {
    let u = queue[head++];
    for (let v of computerGraph[u]) {
      if (!visited[v]) {
        cnt++;
        visited[v] = 1;
        queue.push(v);
      }
    }
  }

  return cnt;
}
