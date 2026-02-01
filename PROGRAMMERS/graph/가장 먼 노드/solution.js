function solution(n, edge) {
  let graph = Array.from({ length: n + 1 }, () => []);

  edge.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });

  let max = 0;
  let idx = 0;
  let queue = [[1, 0]];
  let visited = Array.from({ length: n + 1 }).fill(0);
  visited[1] = 1;

  while (idx < queue.length) {
    let [next, cnt] = queue[idx++];
    if (cnt > max) max = cnt;

    for (n of graph[next]) {
      if (visited[n] === 0) {
        visited[n] = 1;
        queue.push([n, cnt + 1]);
      }
    }
  }

  let maxCnt = 0;
  queue.forEach(([_, cnt]) => {
    if (cnt === max) maxCnt++;
  });

  return maxCnt;
}
