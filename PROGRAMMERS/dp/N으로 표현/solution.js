function solution(N, number) {
  var answer = -1;

  let dp = [];
  if (N === number) return 1;

  dp[1] = new Set().add(N);
  for (let i = 2; i < 9; i++) {
    calcResult(i);

    if (dp[i].has(number)) {
      answer = i;
      break;
    }
  }

  function calcResult(number) {
    dp[number] = new Set();

    for (let i = 1; i < number; i++) {
      const [left, right] = [i, number - i];

      for (let l of dp[left]) {
        for (let r of dp[right]) {
          dp[number].add(l + r);
          dp[number].add(l - r);
          dp[number].add(l * r);
          if (r !== 0) dp[number].add(Math.floor(l / r));
        }
      }
    }

    dp[number].add(Number(String(N).repeat(number)));
  }

  return answer;
}
