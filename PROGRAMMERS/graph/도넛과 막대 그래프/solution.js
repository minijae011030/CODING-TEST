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

  let n = 1_000_001;

  let answer = [0, 0, 0, 0];
  let [createdNode, graphCnt] = [0, 0]; // 생성 정점 저장과 몇개의 그래프가 있는지 저장
  let maxNode = 0; // 가장 노드의 번호가 큰 노드
  let existingNode = new Set(); // 정점의 번호가 순차적으로 주어진다는 보장이 없다

  let adjList = Array.from({ length: n + 1 }, () => []); // 각 노드의 인접 리스트를 저장하는 배열
  let inAndOut = Array.from({ length: n + 1 }, () => [0, 0]); // [나감, 들어옴]

  // 1. 먼저 생성 노드와 그래프 수를 찾아야한다

  // 간선 정보를 인접 리스트와 inAndOut 정보로 변환
  edges.forEach(([from, to]) => {
    adjList[from].push(to);
    inAndOut[from][0] += 1;
    inAndOut[to][1] += 1;
    maxNode = Math.max(maxNode, from, to);
    existingNode.add(from);
    existingNode.add(to);
  });

  // 나간 간선이 제일 많으면서 들어온 간선이 0인 노드가 생성 노드
  inAndOut.forEach(([outCnt, inCnt], index) => {
    if (inCnt === 0 && outCnt > graphCnt) {
      [createdNode, graphCnt] = [index, outCnt];
    }
  });

  answer[0] = createdNode;

  // 2. 생성 노드에 연결된 인접리스트에 가서 도넛의 유형을 구한다

  /*
    막대모양: 나가는 간선 0개
    8자모양: 들어오는 간선 2개 이상, 나가는 간선 2개
    도넛모양: 전체 - 막대 - 8자
    */

  for (let i = 1; i <= maxNode; i++) {
    if (!existingNode.has(i)) continue;

    let [outCnt, inCnt] = inAndOut[i];

    if (outCnt === 0) answer[2] += 1;
    else if (inCnt >= 2 && outCnt === 2) answer[3] += 1;
  }

  answer[1] = graphCnt - answer[2] - answer[3];

  return answer;
}
