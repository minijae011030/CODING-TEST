function solution(info, edges) {
  /*
    양과 늑대
    
    이진트리모양 노드에 늑대와 양 한마리씩
    루트에서 출발하여 각 노드를 돌아다니며 양을 모으려고 함
    노드 방문시 해당 노드의 양과 늑대가 나를 따라옴
    늑대는 양을 잡아먹으려고 함
    양의 수 <= 늑대의 수 -> 모든 양이 잡아먹힘
    중간에 양이 잡아먹히지 않도록하면서 최대한 많은 수의 양을 모으고 루트로 돌아오기
    모을 수 있는 양의 최대 수 return
    
    2 <= info.length <= 17
    info는 0 or 1
    0 양, 1 늑대
    info[0] 항상 양
    
    edges의 각 행은 [부모느도번호, 자식노드번호] => 서로 연결된 두 노드를 나타냄
    0번 노드는 항상 루트
    */

  let answer = [];
  let visited = new Array(info.length).fill(0);

  function dfs(wolf, sheep) {
    answer.push(sheep);

    for (let [parent, child] of edges) {
      if (visited[parent] && !visited[child]) {
        visited[child] = 1;

        let isWolf = info[child];

        let nsheep = sheep + (isWolf ? 0 : 1);
        let nwolf = wolf + (isWolf ? 1 : 0);

        if (nsheep > nwolf) dfs(nwolf, nsheep);

        visited[child] = 0;
      }
    }
  }

  visited[0] = 1;
  dfs(0, 1);
  return Math.max(...answer);
}
