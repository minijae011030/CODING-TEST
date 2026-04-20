const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 동일한 주사위를 n^3개 가지고있음
 *
 * 적절히 회전시키고 쌓아서 n*n*n 형태의 정육면체 만들기
 * 정육면체는 탁자 위에 있으므로 5개의 면만 보인다
 * 5개의 면에 쓰여있는 수의 최솟값을 출력
 *
 * 최솟값이니까
 */

/**
 * 바깥에 보이는 주사위의 개수?
 *
 * 2: 2^3 - 0
 * 3: 3^3 - 1^3 - 1^2
 * 4: 4^3 - 2^3 - 2^2
 * 5: 5^3 - 3^3 - 3^2
 * ...
 * n: n^3 - (n-2)^3 - (n-2)^2
 *
 * 그 중에 세면이 보이는 주사위의 개수: 4
 * 두면이 보이는 주사위의 개수 (n-2) * 4 + (n-1) * 4 = 8n - 12
 * 한면이 보이는 주사위의 개수: (n-2)^2 + 4*(n-1)(n-2) = 5n^2 -16n + 12
 */

let n = BigInt(input[0]); // BigInt 사용
let dice = input[1].split(" ").map(Number);

if (n === 1n) {
  let totalSum = dice.reduce((a, b) => a + b, 0);
  let maxVal = Math.max(...dice);
  console.log(totalSum - maxVal);
} else {
  // 마주보는 면 중 작은 값들 선택
  let minPairs = [
    Math.min(dice[0], dice[5]), // A-F
    Math.min(dice[1], dice[4]), // B-E
    Math.min(dice[2], dice[3]), // C-D
  ].sort((a, b) => a - b);

  let s1 = BigInt(minPairs[0]);
  let s2 = BigInt(minPairs[0] + minPairs[1]);
  let s3 = BigInt(minPairs[0] + minPairs[1] + minPairs[2]);

  // 각 면의 개수 계산
  let count3 = 4n;
  let count2 = 8n * n - 12n;
  let count1 = 5n * n * n - 16n * n + 12n;

  let total = s3 * count3 + s2 * count2 + s1 * count1;
  console.log(total.toString());
}
