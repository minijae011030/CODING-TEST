function solution(plans) {
  var answer = [];

  plans.forEach((plan) => {
    let [hour, min] = plan[1].split(":").map(Number);
    plan.push(hour * 60 + min);
    plan[2] = Number(plan[2]);
  });
  plans.sort((a, b) => a[3] - b[3]);

  let queue = [];

  for (let i = 0; i < plans.length - 1; i++) {
    let [c_name, c_start, c_playtime, c_calculated_start] = plans[i];
    let [n_name, n_start, n_playtime, n_calculated_start] = plans[i + 1];

    if (c_playtime + c_calculated_start > n_calculated_start) {
      c_playtime -= n_calculated_start - c_calculated_start;
      queue.push([c_name, c_playtime, c_calculated_start]);
    } else {
      answer.push(c_name);

      // 남은 시간에 다른거 하기
      let diff = n_calculated_start - c_calculated_start - c_playtime;

      while (queue.length) {
        let [q_name, q_playtime, q_calculated_start] = queue.pop();

        if (q_playtime <= diff) {
          diff -= q_playtime;
          answer.push(q_name);
        } else {
          q_playtime -= diff;
          queue.push([q_name, q_playtime, q_calculated_start]);
          break;
        }
      }
    }
  }

  answer.push(plans[plans.length - 1][0]);
  while (queue.length) {
    answer.push(queue.pop()[0]);
  }

  return answer;
}
