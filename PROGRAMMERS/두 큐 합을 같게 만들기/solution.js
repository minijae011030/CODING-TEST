function solution(queue1, queue2) {
  var answer = 0;
  let target =
    (queue1.reduce((acc, cur) => (acc += cur), 0) +
      queue2.reduce((acc, cur) => (acc += cur), 0)) /
    2;

  let copiedQueue1 = [...queue1];
  let copiedQueue2 = [...queue2];

  let sum1 = copiedQueue1.reduce((acc, cur) => (acc += cur), 0);
  let queue1Idx = 0;
  let queue2Idx = 0;

  while (1) {
    if (answer > queue1.length * 3) return -1;
    if (sum1 === target) return answer;

    if (sum1 > target) {
      let num1 = copiedQueue1[queue1Idx++];
      copiedQueue2.push(num1);
      sum1 -= num1;
      answer++;
    } else {
      let num2 = copiedQueue2[queue2Idx++];
      copiedQueue1.push(num2);
      sum1 += num2;
      answer++;
    }
  }
}
