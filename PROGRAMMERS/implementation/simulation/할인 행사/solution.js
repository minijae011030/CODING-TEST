function solution(want, number, discount) {
  let answer = 0;

  for (let i = 0; i < discount.length - 9; i++) {
    let sliced_item = discount.slice(i, i + 10);
    if (is_good_date(want, [...number], sliced_item)) answer++;
  }

  return answer;
}

function is_good_date(want, number, sliced_item) {
  let flag = true;

  sliced_item.map((item) => {
    if (want.indexOf(item) === -1) flag = false;
    else number[want.indexOf(item)] -= 1;
  });

  number.map((n) => {
    if (n > 0) flag = false;
  });

  return flag;
}
