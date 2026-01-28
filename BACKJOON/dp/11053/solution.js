const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input[0]);
let A = input[1].split(" ").map(Number);

/**
 * 수열 A가 주어졌을 때, 가장 긴 증가하는 부분수열을 증가하는 프로그램
 * @param {number} N - 수열 A의 크기
 * @param {number[]} A - 수열
 * @returns
 */
function solution(N, A) {
  // dp[i] = i번째 원소를 반드시 마지막으로 쓰는 LIS의 길이
  // i번째를 마지막으로 쓰려면? -> 이전 인덱스들 중에서 dp[j]가 큰걸 골라서 +1

  let dp = Array.from({ length: N }).fill(1);

  /**
   * 가장 긴 부분수열의 길이
   * dp[i] = i번째 원소를 가장 마지막원소로 잡는 LIS의 길이
   * dp[i] = 1 -> 초기에는 자기 자신만 있는 수열의 경우
   *
   * 그 이후부터
   * dp[1]보다 dp[0]이 작으면 증가하는 부분수열이니까
   * dp[1] = dp[0] + 1이랑 dp[1]이랑 비교해서 큰값
   */

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  return Math.max(...dp);
}

console.log(solution(N, A));

/**
 * 이미 j < i 인 모든 위치에 대해
 * dp[j] = j에서 끝나는 LIS 길이는 계산 완료
 * A[i]를 마지막에 붙이고싶음
 *
 * A[j] < A[i] 이걸 만족하는 모든 j가 후보
 *
 * j = 0일때
 * -> A[0]으로 끝나는 증가 수열 뒤에 A[i]를 붙일 수 있음
 * -> 길이 = dp[0] + 1
 *
 * j = 3일때
 * -> A[3]으로 끝나는 증가 수열 뒤에 A[i]를 붙일 수 있음
 * -> 길이 = dp[3] + 1
 *
 * 여러개중에 어떤 걸 골라야 i에서 끝나는 LIS가 될까?
 * -> 가장 긴 수열을 골라 뒤에 붙여야 함.
 *
 * dp[i] = Math.max(dp[i], dp[j] + 1);
 * 지금까지 내가 알고있는 i에서 끝나는 최장 길이 (dp[i])랑
 * j 뒤에 붙였을때 길이(dp[j] + 1) 중에 더 긴걸로 갱신
 */
