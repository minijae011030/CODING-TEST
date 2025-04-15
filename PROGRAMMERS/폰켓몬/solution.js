function solution(nums) {
  const select = nums.length / 2;

  const check = nums.reduce((total, cur) => {
    total[cur] ? total[cur]++ : (total[cur] = 1);
    return total;
  }, {});

  const checkLeng = Object.keys(check).length;

  return checkLeng > select ? select : checkLeng;
}
