const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [L, R] = input[0].split(" ").map(String);

if (L.length !== R.length) return console.log(0);

let cnt = 0;
for (let i = 0; i < L.length; i++) {
  if (L[i] !== R[i]) break;
  if (L[i] === "8") cnt++;
}

console.log(cnt);
/**
 * 자릿수가 다르면 8의 개수는 0
 * 자리수가 같으면 L과 R의 공통 접두사가 언제까지 나오는지 봐야함
 * 최초로 다른 자리가 나오면 그 뒤로는 8을 안써도 됨
 * L과 R이 같은 접두사 구간에서 8이 들어간 개수
 */
