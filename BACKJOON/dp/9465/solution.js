const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 스티커 2n개
 * 책상꾸미기
 * 스티커 한장 떼면 변을 공유하는 스티커는 모두 찢어져서 사용 불가능
 * 뗀 스티커의 상하좌우 스티커 사용 불가
 *
 * 스티커에 점수 매기고 점수의 합이 최대가 되도록 스티커 떼기
 */

let idx = 0;
const T = Number(input[idx++]);

for (let i = 0; i < T; i++) {
  let N = Number(input[idx++]);

  let stickers = [];
  for (let j = 0; j < 2; j++) {
    stickers.push(input[idx++].split(" ").map(Number));
  }

  let dp = Array.from({ length: 2 }, () => Array(N).fill(0));

  dp[0][0] = stickers[0][0];
  dp[1][0] = stickers[1][0];
  dp[0][1] = stickers[1][0] + stickers[0][1];
  dp[1][1] = stickers[0][0] + stickers[1][1];

  /**
   * [v][ ][ ][ ]
   * [ ][ ][v][ ]
   *
   * [ ][v][ ][ ]
   * [v][ ][v][ ]
   */
  for (let x = 2; x < N; x++) {
    dp[0][x] = Math.max(dp[1][x - 1], dp[1][x - 2]) + stickers[0][x];
    dp[1][x] = Math.max(dp[0][x - 1], dp[0][x - 2]) + stickers[1][x];
  }

  console.log(Math.max(dp[0][N - 1], dp[1][N - 1]));
}
