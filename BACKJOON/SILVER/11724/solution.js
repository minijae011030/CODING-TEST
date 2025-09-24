const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let idx = 0;
let [N, M] = input[idx++].split(" ").map(Number);
let graph = Array.from({ length: N }, () => []);
let visited = new Array(N).fill(0);

for (let i = 0; i < M; i++) {
  let [u, v] = input[idx++].split(" ").map(Number);
  graph[u - 1].push(v - 1);
  graph[v - 1].push(u - 1);
}

function DFS(node) {
  visited[node] = 1;

  for (const next of graph[node]) {
    if (!visited[next]) {
      DFS(next);
    }
  }
}

let answer = 0;
for (let i = 0; i < N; i++) {
  if (!visited[i]) {
    DFS(i);
    answer++;
  }
}

console.log(answer);
