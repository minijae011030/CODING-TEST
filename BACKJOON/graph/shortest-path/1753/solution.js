const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [V, E] = input[0].split(" ").map(Number);
let K = Number(input[1]) - 1;

const graph = Array.from({ length: V }, () => []);
for (let i = 2; i < E + 2; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  graph[u - 1].push({ to: v - 1, weight: w });
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][1] <= this.heap[i][1]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length === 0) return top;

    this.heap[0] = end;
    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (
        left < this.heap.length &&
        this.heap[left][1] < this.heap[smallest][1]
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[smallest][1]
      ) {
        smallest = right;
      }
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }

    return top;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const dist = Array(V).fill(Infinity);
dist[K] = 0;
const visited = Array(V).fill(false);
const heap = new MinHeap();
heap.push([K, 0]);

while (!heap.isEmpty()) {
  const [now, nowDist] = heap.pop();

  if (visited[now]) continue;
  visited[now] = true;

  for (const next of graph[now]) {
    const cost = nowDist + next.weight;
    if (cost < dist[next.to]) {
      dist[next.to] = cost;
      heap.push([next.to, cost]);
    }
  }
}

for (let i = 0; i < V; i++) {
  console.log(dist[i] === Infinity ? "INF" : dist[i]);
}
