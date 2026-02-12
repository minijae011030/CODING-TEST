function solution(targets) {
  let answer = 0;
  let prev = -1;

  targets.sort((a, b) => a[1] - b[1]);
  for ([start, end] of targets) {
    if (prev <= start) {
      prev = end;
      answer += 1;
    }
  }

  return answer;
}
