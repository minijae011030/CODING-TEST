function solution(queue1, queue2) {
  let answer = 0;

  let queue1_sum = queue1.reduce((acc, cur) => (acc += cur), 0);
  let queue2_sum = queue2.reduce((acc, cur) => (acc += cur), 0);

  let len = queue1.length + queue2.length;

  let queue1_idx = 0,
    queue2_idx = 0;

  while (queue1_sum != queue2_sum) {
    answer++;

    if (queue1_sum > queue2_sum) {
      queue1_sum -= queue1[queue1_idx];
      queue2.push(queue1[queue1_idx]);
      queue2_sum += queue1[queue1_idx++];
    } else {
      queue2_sum -= queue2[queue2_idx];
      queue1.push(queue2[queue2_idx]);
      queue1_sum += queue2[queue2_idx++];
    }

    if (queue1_idx > len || queue2_idx > len) return -1;
  }

  return answer;
}
