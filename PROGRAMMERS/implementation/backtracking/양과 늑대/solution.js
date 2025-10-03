function solution(info, edges) {
  let answer = [];
  let visited = new Array(info.length).fill(0);

  function DFS(sheep, wolf) {
    if (sheep > wolf) answer.push(sheep);
    else return;

    for (let [p, c] of edges) {
      if (visited[p] && !visited[c]) {
        visited[c] = 1;
        if (info[c] === 0) DFS(sheep + 1, wolf);
        else DFS(sheep, wolf + 1);
        visited[c] = 0;
      }
    }
  }

  visited[0] = 1;
  DFS(1, 0);

  return Math.max(...answer);
}
