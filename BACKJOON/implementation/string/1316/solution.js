const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
let ans = 0;
for (let i = 0; i < n; i++) {
  let word = input[i + 1];
  let flag = true;
  let tmp = [];
  for (let j = 0; j < word.length; j++) {
    if (tmp.length === 0) {
      tmp.push(word[j]);
      continue;
    }

    if (tmp[tmp.length - 1] !== word[j]) {
      if (tmp.includes(word[j])) {
        flag = false;
      } else {
        tmp.push(word[j]);
      }
    }
  }
  if (flag) ans++;
}

console.log(ans);
