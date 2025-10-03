function solution(arr) {
  let answer = [arr.shift()];

  let idx = 0;
  while (arr.length > idx) {
    let n = arr[idx++];
    if (answer[answer.length - 1] != n) {
      answer.push(n);
    }
  }

  return answer;
}
