function solution(n, computers) {
  var answer = 0;
  let visited = Array(n).fill(0);

  for (let i = 0; i < computers.length; i++) {
    if (!visited[i]) {
      answer++;
      DFS(i);
    }
  }

  function DFS(idx) {
    visited[idx] = 1;
    for (let i = 0; i < computers[idx].length; i++) {
      if (!visited[i] && computers[idx][i]) {
        DFS(i);
      }
    }
  }

  return answer;
}
