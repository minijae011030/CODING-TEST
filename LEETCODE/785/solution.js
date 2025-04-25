/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  /**
   * 1. 방문 안 한 정점을 시작점으로 잡고
   * 2. 해당 정점을 색칠함 (예: 파랑=0)
   * 3. 이웃을 순회하면서:
   *     a. 방문 안 했으면 → 반대 색으로 칠함 → 큐/재귀에 넣음
   *     b. 이미 방문했고, 같은 색이면 -> 이분 그래프 아님
   * 4. 문제 없으면 → 다음 컴포넌트로 넘어감
   */

  let n = graph.length;
  let visited = Array(n).fill(0);

  for (let k = 0; k < n; k++) {
    if (visited[k]) continue;
    let queue = [];
    let color = Array(n).fill(-1); // 아직 색을 칠하지 않은 상태

    queue.push({ idx: k, adj: graph[k] });
    visited[k] = 1;
    color[k] = 1; // 0: red, 1: blue

    while (queue.length) {
      const node = queue.shift();
      const adj_arr = node.adj;
      for (let i = 0; i < adj_arr.length; i++) {
        const adj_node = adj_arr[i];
        if (!visited[adj_node]) {
          // 방문 안했으면 반대색으로 칠함
          color[adj_node] = color[node.idx] == 1 ? 0 : 1;
          visited[adj_node] = 1; // 방문처리
          queue.push({ idx: adj_node, adj: graph[adj_node] });
        } else {
          // 방문 했고, 같은색이면 이분그래프 아님
          if (color[adj_node] == color[node.idx]) return false;
        }
      }
    }
  }

  return true;
};
