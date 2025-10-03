const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * N개의 달걀 잠재적 고객 M명
 * 각각의 i번째 고객은 달걀 하나를 Pi가격 이하로 살수 있다고 함
 * 고객에게 두 개 이상의 달걀은 팔지 않음 -> 한개만 판다!
 * A가격에 달걀을 판다 -> Pi가 A가격보다 크거나 같은 고객은 달걀을 삼 (총 수량을 초과하여 팔 수는 없음)
 * 최대 수익을 올릴 수 있는 달걀의 가장 낮은 가격 책정
 *
 * price 배열 오름차순 정렬, 각 price[i]를 판매가 A로 가정
 * A 이상 지불 가능한 고객 수 = M - i
 * 실제 판매 수량 = min(N, M-i) -> 달걀 개수 N을 넘길 수 없으니까..
 * 매출 = Pi * min(N, M-i)
 */

const [N, M] = input[0].split(" ").map(Number);
let price = [];
for (let i = 0; i < M; i++) {
  price.push(Number(input[i + 1]));
}
price = price.sort((a, b) => a - b);

let max = 0;
let max_price = 0;
for (let i = 0; i < M; i++) {
  let customer = M - i;
  let sell = Math.min(N, customer);
  const sale = price[i] * sell;
  if (max < sale) {
    max = sale;
    max_price = price[i];
  }
}
console.log(max_price, max);
