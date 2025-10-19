const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
let coins = input.slice(1, 1 + n).map(Number);

coins = coins.filter((c) => c > 0 && c <= k);
coins = Array.from(new Set(coins)).sort((a, b) => a - b);

const dp = new Uint32Array(k + 1);
dp[0] = 1; // 합이 0을 만드는 방법은 아무 것도 안 쓰는 1가지

for (let i = 0; i < coins.length; i++) {
  for (let j = coins[i]; j <= k; j++) {
    // coin[i]로 만들수있는 합은 coins[i]~k (coin[i] 이하는 못만들고 k까지만 구하면 되니까)
    // i원으로 j원을 만드는 경우의 수
    // dp[j] = 지금까지 돌린 동전들(첫 i개 동전)만 써서 합이 j가 되는 경우의 수

    dp[j] = dp[j] + dp[j - coins[i]];
    /**
     * 1. 이번 동전을 하나도 안 쓰는 경우
     * → “이미 직전에 계산해 둔 dp[j]”가 바로 그 개수
     * (왜? “현재까지 처리한 동전들”이라는 말에는 i번째 이전 동전들이 포함되니까, “이번 동전 안 쓰는 경우”는 직전 결과 그대로)
     *
     * 2. 이번 동전을 적어도 한 번 쓰는 경우
     * → 일단 이번 동전 하나를 썼다고 생각하면 남은 금액은 j - coin
     * → 남은 금액 j - coin을 (이번 동전 포함) 지금까지의 동전들로 만드는 모든 방법이 필요
     * → 그 개수가 바로 dp[j - coin]
     */
  }
}

console.log(dp[k]);
