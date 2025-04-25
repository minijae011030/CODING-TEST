/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const pay = new Array(amount + 1).fill(Infinity);
  // pay[i]는 i원을 만드는데 필요한 최소 동전 수

  pay[0] = 0; // 0원은 동전 0개로 만들 수 있으니까 pay[0] = 0

  for (let i = 0; i < coins.length; i++) {
    // 동전의 종류대로 반복
    for (let j = coins[i]; j <= amount; j++) {
      // 해당 동전으로 만들 수 있는 금액 j 처리
      pay[j] = Math.min(pay[j], pay[j - coins[i]] + 1);
      /**
       * j원을 만들기 위한 최소 동전 개수를 갱신하는 로직
       *
       * - pay[j]는 현재까지 알고 있는 j원의 최소 동전 수
       * - pay[j - coins[i]] + 1 은 "j - coins[i]원을 만든 뒤, coins[i] 동전 하나 추가한 경우"
       *
       * 기존 방법(pay[j])과
       * 이번 동전으로 만든 새로운 방법(pay[j - coins[i]] + 1)을 비교해서
       * 더 적은 개수를 선택한다.
       */
    }
  }

  return pay[amount] === Infinity ? -1 : pay[amount];
};
