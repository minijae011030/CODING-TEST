function solution(info, n, m) {
  /*
    완전범죄
    
    a, b 도둑이 팀을 이루어 모든 물건 훔치려고 함
    각 도둑이 물건을 훔칠 때 남기는 흔적이 누적되면 경찰에 붙잠힘
    두 도둑 중 누구도 경찰에 붙잡히지 않도록 흔적 최소화
    
    물건 i를 훔칠때
    a가 훔치면 info[i][0]개의 a에 대한 흔적
    b가 훔치면 info[i][1]개의 b에 대한 흔적
    info[i] -> i를 훔칠 때 생기는 흔적의 개수
    각 물건에 대해 a, b가 남기는 흔적의 개수는 1 이상 3 이하
    
    경찰에 붙잡히는 조건
    a의 누적 흔적 개수 >= n
    b의 누적 흔적 개수 >= m
    
    두 도둑 모두 경찰에 붙잡히지 않도록 "모든 물건을 훔쳤을 때"
    a의 누적 흔적 개수 최솟값을 리턴
    
    어떠한 방법으로든 경찰에 붙잡히지 않게 할 수 없으면 -1 리턴
    */

  // dp[a] = A의 흔적이 a일 때, B의 흔적의 최솟값
  let dp = Array(n).fill(Infinity);
  dp[0] = 0;

  for (let [ac, bc] of info) {
    // 물건 하나씩 꺼내기
    let next = Array(n).fill(Infinity);

    // A가 남긴 흔적이 a점이다
    for (let a = 0; a < n; a++) {
      if (dp[a] === Infinity) continue;

      // A가 훔칠 수 있는 경우
      if (a + ac < n) {
        next[a + ac] = Math.min(next[a + ac], dp[a]);
      }

      // B가 훔칠 수 있는 경우
      if (dp[a] + bc < m) {
        next[a] = Math.min(next[a], dp[a] + bc);
      }
    }

    dp = next;
  }

  for (let a = 0; a < n; a++) {
    if (dp[a] !== Infinity) return a;
  }

  return -1;
}
