function solution(s) {
  var answer = s.length;

  for (let i = 1; i <= s.length; i++) {
    // i -> 자르는 개수
    let zipString = [];

    for (let j = 0; j < s.length; j += i) {
      zipString.push(s.slice(j, j + i));
    }

    let finalString = "";
    let count = 1;

    for (let k = 1; k < zipString.length; k++) {
      if (zipString[k] === zipString[k - 1]) {
        count++;
      } else {
        finalString += (count > 1 ? count : "") + zipString[k - 1];
        count = 1;
      }
    }

    // 마지막 처리
    finalString += (count > 1 ? count : "") + zipString[zipString.length - 1];

    answer = Math.min(answer, finalString.length);
  }

  return answer;
}
