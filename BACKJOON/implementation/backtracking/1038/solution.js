const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * n번째 감소하는 수를 찾는 함수
 * @param {number} n n번째 감소하는 수를 찾기 위한 변수
 */
function solution(n) {
  let result = [];

  /**
   * 감소하는 수를 찾기 위해 재귀
   * @param {string} numStr 현재 감소하는 수
   * @param {number} lastDigit 현재 감소하는 수의 마지막 숫자
   */
  function dfs(numStr, lastDigit) {
    result.push(Number(numStr));

    if (lastDigit === 0) return;

    for (let i = 0; i < lastDigit; i++) {
      dfs(numStr + i, i);
    }
  }

  for (let i = 0; i <= 9; i++) {
    dfs(String(i), i);
  }

  result.sort((a, b) => a - b);

  return result.length > n ? result[n] : -1;
}

let n = Number(input[0]);

console.log(solution(n));
