/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  const n = graph.length;

  const safe = new Array(n).fill(false); // safe node를 추적하는 배열
  const visited = new Array(n).fill(false); // 현재 방문한 노드를 추적
  const path = new Array(n).fill(false); // 경로 상의 노드를 추적

  const dfs = (node) => {
    if (path[node]) return false; // 현재 경로에 노드가 있으면 사이클 발생, 안전하지 않음
    if (visited[node]) return safe[node]; // 이미 방문한 노드는 이전 계산 결과를 리턴

    path[node] = true;
    visited[node] = true;

    // 해당 노드에서 나가는 모든 간선에 대해 안전한지 확인
    for (let neighbor of graph[node]) {
      if (!dfs(neighbor)) {
        safe[node] = false;
        path[node] = false;
        return false;
      }
    }

    safe[node] = true; // 모든 경로가 안전하다면 해당 노드는 안전
    path[node] = false;
    return true;
  };

  for (let i = 0; i < n; i++) {
    if (!visited[n]) {
      dfs(i);
    }
  }

  const result = [];
  for (let i = 0; i < n; i++) {
    if (safe[i]) {
      result.push(i);
    }
  }

  return result;
};
