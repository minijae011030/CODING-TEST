function solution(queue1, queue2) {
  var answer = 0;
  let N = queue1.length;
  let target =
    (queue1.reduce((acc, cur) => (acc += cur), 0) +
      queue2.reduce((acc, cur) => (acc += cur), 0)) /
    2;

  let sum1 = queue1.reduce((acc, cur) => (acc += cur), 0);
  let queue1Idx = 0;
  let queue2Idx = 0;

  while (1) {
    if (answer > N * 3) return -1;
    if (sum1 === target) return answer;

    if (sum1 > target) {
      let num1 = queue1[queue1Idx++];
      queue2.push(num1);
      sum1 -= num1;
      answer++;
    } else {
      let num2 = queue2[queue2Idx++];
      queue1.push(num2);
      sum1 += num2;
      answer++;
    }
  }
}
