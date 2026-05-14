function solution(edges) {
  /*
    도넛과 막대 그래프
    
    도넛, 막대, 8자 모양 그래프
    1개 이상의 정점과, 정점들을 연결하는 단방향 간선
    
    크기가 n인 도넛모양 그래프: n개의 정점, n개의 간선, 원래 출발했던 정점으로 돌아옴
    크기각 n인 막대모양 그래프: n개의 정점, n-1개의 간선, 각 정점을 한번씩 방문
    크기가 n인 8자 모양 그래프: 2n+1개의 정점, 2n+2개의 간선
    
    이 그래프들과 무관한 정점 하나 생성하고 각 그래프들을 다 연결하였다
    생성한 정점의 번호, 정점을 생성하기 전 각 그래프 수
    
    생성한 정점의 번호, 도넛 모양 그래프 수, 막대 모양 그래프 수, 8자 모양 그래프 수 리턴
    */

  /*
    도넛 판정 기준
    나가는 길이 두갈래? -> 바로 8자
    돌아왔다? -> 도넛 혹은 8자
        가고있는데 두갈래길 나오면 8자
        안나오면 도넛
    안돌아왔다? -> 일자
    */

  let maxNode = 0;
  const existingNodes = new Set(); // 실제로 존재하는 노드인지
  for (let [from, to] of edges) {
    maxNode = Math.max(maxNode, from, to);
    existingNodes.add(from);
    existingNodes.add(to);
  }

  // inAndOut[node] = [outdegree, indegree]
  let inAndOut = Array.from({ length: maxNode + 1 }, () => [0, 0]);
  for (let [from, to] of edges) {
    inAndOut[from][0]++;
    inAndOut[to][1]++;
  }

  let answer = [0, 0, 0, 0]; // 생성점, 도넛, 막대, 8자

  // 생성 정점 찾기
  for (let i = 1; i <= maxNode; i++) {
    let [outCnt, inCnt] = inAndOut[i];
    if (outCnt >= 2 && inCnt === 0) {
      answer[0] = i;
      break;
    }
  }

  let createdNode = answer[0];
  let totalGraphs = inAndOut[createdNode][0];

  // 전체 간선을 돌며 특이 정점들의 개수 세기
  for (let i = 1; i <= maxNode; i++) {
    if (!existingNodes.has(i) || i === createdNode) continue;

    let [outCnt, inCnt] = inAndOut[i];

    // 막대 모양: 나가는 간선 0개
    if (outCnt === 0) {
      answer[2]++;
    }
    // 8자 모양: 나가는 간선 2개, 들어오는 간선 2개 이상
    else if (outCnt === 2 && inCnt >= 2) {
      answer[3]++;
    }
  }

  // 도넛 모양: 총 개수에서 막대와 8자를 뺌
  answer[1] = totalGraphs - answer[2] - answer[3];

  return answer;
}
