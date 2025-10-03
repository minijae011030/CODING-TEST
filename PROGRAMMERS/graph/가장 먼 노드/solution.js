function solution(n, edge) {
  // let visited = Array(n).fill(false);
  let graph = Array.from(Array(n + 1), () => []);
  edge.forEach((element) => {
    const [a, b] = element;
    graph[a].push(b);
    graph[b].push(a);
  });

  const BFS = (graph, start) => {
    const visited = new Array(graph.length).fill(false);
    const distance = new Array(graph.length).fill(0);

    const queue = [start];
    visited[start] = true;

    while (queue.length > 0) {
      const current = queue.shift();
      for (const element of graph[current]) {
        if (!visited[element]) {
          visited[element] = true;
          distance[element] = distance[current] + 1;
          queue.push(element);
        }
      }
    }

    const max = Math.max(...distance); // 배열에서 최대값 찾기
    const count = distance.filter((value) => value === max).length;

    return count;
  };

  return BFS(graph, 1);
}
