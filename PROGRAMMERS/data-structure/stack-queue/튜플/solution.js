function solution(s) {
  var answer = [];
  s = s.split("},{");

  let arr = [];
  for (let i = 0; i < s.length; i++) {
    if (i === 0) s[i] = s[i].slice(2, s[i].length);
    if (i === s.length - 1) s[i] = s[i].slice(0, s[i].length - 2);
    arr.push(s[i].split(","));
  }
  arr.sort((a, b) => a.length - b.length);

  for (let i = 0; i < arr.length; i++) {
    let target = arr[i][0];
    answer.push(Number(target));

    for (let j = i; j < arr.length; j++) {
      let idx = arr[j].indexOf(target);
      arr[j].splice(idx, 1);
    }
  }

  return answer;
}
