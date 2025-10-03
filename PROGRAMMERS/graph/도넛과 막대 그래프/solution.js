function solution(edges) {
  const n = 1000001;
  const answer = [0, 0, 0, 0]; // 정점, 도넛, 막대, 8자
  const adjL = Array.from({ length: n + 1 }, () => []); // 인접 리스트
  const visited = Array.from({ length: n + 1 }, () => false);
  const inAndOut = Array.from({ length: n + 1 }, () => [0, 0]); // [나감, 들어옴]

  edges.forEach(([start, to]) => {
    adjL[start].push(to); // 인접 리스트 기록
    inAndOut[start][0] += 1; // 나가는 간선 수 기록
    inAndOut[to][1] += 1; // 들어오는 간선 수 기록
  });

  // 나간게 가장 많고 들어온 것은 없는 정점이 생성한 정점
  let [createdNode, nodeCnt] = [0, 0];
  inAndOut.forEach(([cntOut, cntIn], idx) => {
    if (nodeCnt < cntOut && cntIn === 0) {
      createdNode = idx;
      nodeCnt = cntOut;
    }
  });

  // 정점 저장
  answer[0] = createdNode;

  // 탐색
  adjL[createdNode].forEach((outNode) => {
    let shape = 0; // 현재의 도넛 모양은 무엇인가

    // 현재 지점이 두 갈래 길로 되어있다면 8자 모양
    if (adjL[outNode].length === 2) {
      shape = 3;
    } else {
      const stack = [outNode];
      visited[outNode] = true;

      let canReturn = false; // 출발 지점으로 돌아왔는가?
      let hasTwoWays = false; // 두 갈래 길로 되어있는가?

      while (stack.length) {
        const currentNode = stack.pop();

        for (const nextNode of adjL[currentNode]) {
          if (visited[nextNode]) {
            // 일단 막대는 아님
            canReturn = true;
            continue;
          }
          // 가는 길이 2개 인가
          if (adjL[nextNode].length === 2) {
            hasTwoWays = true;
          }

          visited[nextNode] = true;
          stack.push(nextNode);
        }
      }

      if (canReturn) {
        if (hasTwoWays) shape = 3; // 8자 모양
        else shape = 1; // 도넛 모양
      } else {
        shape = 2; // 막대 모양
      }
    }

    answer[shape] += 1;
  });

  return answer;
}
