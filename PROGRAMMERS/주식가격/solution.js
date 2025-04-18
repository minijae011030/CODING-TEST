function solution(prices) {
  var answer = [];

  let stockArr = [[prices.shift(), 0, 0]]; // [가격, 가격이 오른 시간, 하락 여부]

  let idx = 0;
  while (prices.length > idx) {
    const s = prices[idx++];
    stockArr.forEach((stock) => {
      if (stock[2] == 0) {
        stock[1] += 1;

        if (stock[0] > s) stock[2] = 1;
      }
    });

    stockArr.push([s, 0, 0]);
  }

  for (stock of stockArr) {
    answer.push(stock[1]);
  }

  return answer;
}
