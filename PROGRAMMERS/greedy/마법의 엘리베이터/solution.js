function solution(storey) {
  var answer = 0;

  while (storey > 0) {
    let digit = storey % 10;
    storey = Math.floor(storey / 10);

    if (digit === 0) continue;

    if (digit < 5) {
      answer += digit;
    } else if (digit > 5) {
      answer += 10 - digit;
      storey++;
    } else {
      if (storey % 10 >= 5) storey++;
      answer += digit;
    }
  }

  return answer;
}
