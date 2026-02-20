function solution(tickets) {
  var answer = [];

  let track = [];
  let visited = Array(tickets.length).fill(0);

  tickets.sort();

  // 경로가 없으면 되돌아가야함!
  function dfs(dst, cnt) {
    track.push(dst);

    // 끝까지 완주 성공 시
    if (cnt === tickets.length) {
      answer = track;
      return 1; // 막힌 경로가 없었다는 뜻!
    }

    for (let i = 0; i < tickets.length; i++) {
      if (!visited[i] && tickets[i][0] === dst) {
        // 방문처리
        visited[i] = 1;
        // 만약 다른 공항을 가는데 성공하면 true 리턴
        if (dfs(tickets[i][1], cnt + 1)) return 1;
        // i번째 티켓은 다른 경로에서 써야하니까 되돌림
        visited[i] = 0;
      }
    }

    // cnt < tickets.lenth인데
    // 현재 dst에서 갈 수 있는 다른 공항이 하나도 없는 경우 실패 처리

    // 실패한 공항 없애기
    track.pop();
    return 0; // 막혔다!
  }

  dfs("ICN", 0);
  return answer;
}
