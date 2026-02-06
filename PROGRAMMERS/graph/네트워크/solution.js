function solution(n, computers) {
  let answer = 0;
  let visited = Array.from({ length: n }).fill(0);

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = 1;
      dfs(i);
      answer++;
    }
  }

  function dfs(node) {
    for (let i = 0; i < computers[node].length; i++) {
      if (computers[node][i] && !visited[i]) {
        visited[i] = 1;
        dfs(i);
      }
    }
  }

  return answer;
}
