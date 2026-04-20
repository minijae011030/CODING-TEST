const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 회문, 팰린드롬: 앞 뒤 방향으로 볼 때 같은 순서의 문자로 구성된 문자열
 * 유사 회문: 한 문자를 삭제하여 회문으로 만들 수 있는 문자열
 * 회문: 0, 유사회문: 1, 그 외: 2
 */

let idx = 0;
const T = Number(input[idx++]);
let result = [];

for (let t = 0; t < T; t++) {
  let str = input[idx++];

  result.push(checkPal(str));
}

function isPalindrome(s, l, r) {
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}

function checkPal(str) {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] === str[end]) {
      start++;
      end--;
    } else {
      let leftCase = isPalindrome(str, start + 1, end);
      let rightCase = isPalindrome(str, start, end - 1);

      if (leftCase || rightCase) return 1;
      return 2;
    }
  }
  return 0;
}

console.log(result.join("\n"));
