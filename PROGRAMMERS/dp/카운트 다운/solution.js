function solution(target) {
  // dp[a][b]
  // dp[a][0] -> a 점을 만들 때 최소 다트 수
  // dp[a][1] -> a 점을 만들 때 싱글 또는 불을 맞춘 횟수 합

  let dp = Array.from({ length: target + 1 }, () => [Infinity, 0]);
  dp[0] = [0, 0];

  for (let i = 1; i <= target; i++) {
    // 불
    if (i - 50 >= 0) {
      let prev = i - 50;
      let cand = [dp[prev][0] + 1, dp[prev][1] + 1];

      if (cand[0] < dp[i][0]) dp[i] = cand;
      if (cand[0] === dp[i][0] && cand[1] > dp[i][1]) dp[i] = cand;
    }

    for (let j = 1; j <= 20; j++) {
      // 싱글
      if (i - j >= 0) {
        let prev = i - j;
        let cand = [dp[prev][0] + 1, dp[prev][1] + 1];

        if (cand[0] < dp[i][0]) dp[i] = cand;
        if (cand[0] === dp[i][0] && cand[1] > dp[i][1]) dp[i] = cand;
      }
      // 더블
      if (i - j * 2 >= 0) {
        let prev = i - 2 * j;
        let cand = [dp[prev][0] + 1, dp[prev][1] + 0];

        if (cand[0] < dp[i][0]) dp[i] = cand;
        if (cand[0] === dp[i][0] && cand[1] > dp[i][1]) dp[i] = cand;
      }
      // 트리플
      if (i - j * 3 >= 0) {
        let prev = i - 3 * j;
        let cand = [dp[prev][0] + 1, dp[prev][1] + 0];

        if (cand[0] < dp[i][0]) dp[i] = cand;
        if (cand[0] === dp[i][0] && cand[1] > dp[i][1]) dp[i] = cand;
      }
    }
  }

  return dp[target];
}
