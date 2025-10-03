const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const V = Number(input[0]);
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= V; i++) {
  const arr = input[i].trim().split(" ").map(Number);
  const u = arr[0];
  for (let k = 1; k < arr.length - 1; k += 2) {
    const v = arr[k];
    if (v === -1) break;
    const d = arr[k + 1];
    graph[u].push([v, d]);
    graph[v].push([u, d]);
  }
}

function solution(start) {
  const visited = new Array(V + 1).fill(0);
  const queue = [[start, 0]];
  visited[start] = 1;

  let maxNode = start;
  let maxDist = 0;
  let head = 0;
  while (head < queue.length) {
    const [v, dist] = queue[head++];

    if (dist > maxDist) {
      maxDist = dist;
      maxNode = v;
    }

    for (const [u, d] of graph[v]) {
      if (!visited[u]) {
        visited[u] = 1;
        queue.push([u, dist + d]);
      }
    }
  }
  return [maxNode, maxDist];
}

const [A] = solution(1); // 임의의 정점 1에서 가장 먼 정점 A
const [_, diameter] = solution(A);
console.log(diameter);
