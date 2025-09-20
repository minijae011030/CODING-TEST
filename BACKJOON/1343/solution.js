const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let board = input[0].split(".");

let ans = [];
for (let token of board) {
  let L = token.length;
  if (L === 0) {
    ans.push("");
    continue;
  }
  if (L % 2 === 1) return console.log(-1);

  const Acnt = Math.floor(L / 4);
  const Bcnt = (L % 4) / 2;

  ans.push("AAAA".repeat(Acnt) + "BB".repeat(Bcnt));
}

console.log(ans.join("."));
