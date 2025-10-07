const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [L, C] = input[0].split(" ").map(Number);
const words = input[1].split(" ");

words.sort();

const vowels = ["a", "e", "i", "o", "u"];
let path = [];
let res = [];

function backtrack(start, picked, vCnt, cCnt) {
  if (picked === L) {
    if (vCnt >= 1 && cCnt >= 2) {
      res.push(path.join(""));
      return;
    }
  }

  for (let i = start; i < C; i++) {
    if (picked + (C - i) < L) break;

    let cn = words[i];
    path.push(cn);
    if (vowels.includes(cn)) backtrack(i + 1, picked + 1, vCnt + 1, cCnt);
    else backtrack(i + 1, picked + 1, vCnt, cCnt + 1);
    path.pop();
  }
}

backtrack(0, 0, 0, 0);

console.log(res.join("\n"));
