/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x >= Math.pow(2, 31) || x <= -Math.pow(2, 31)) {
    return 0;
  }

  let answer = 0;
  let isNegative = false;

  if (x < 0) {
    x *= -1;
    isNegative = true;
  }

  while (x > 0) {
    let digit = x % 10;
    answer = answer * 10 + digit;
    x = Math.floor(x / 10);

    if (answer >= Math.pow(2, 31) || answer <= -Math.pow(2, 31)) {
      return 0;
    }
  }

  if (isNegative) {
    answer *= -1;
  }

  return answer;
};
