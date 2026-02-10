function solution(m, n, puddles) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  const block = Array.from({ length: m }, () => Array(n).fill(0));

  for (const [x, y] of puddles) block[x - 1][y - 1] = 1;

  dp[0][0] = 1;

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      if (block[x][y]) {
        dp[x][y] = 0;
        continue;
      }

      if (x === 0 && y === 0) continue;
      const left = x > 0 ? dp[x - 1][y] : 0;
      const up = y > 0 ? dp[x][y - 1] : 0;
      dp[x][y] = (left + up) % 1_000_000_007;
    }
  }

  return dp[m - 1][n - 1];
}
