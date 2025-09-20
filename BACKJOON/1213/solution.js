const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let name = input[0];
const cnt = Array(26).fill(0);
for (let ch of name) {
  cnt[ch.charCodeAt(0) - 65]++;
}

let odd = 0;
let mid = "";
for (let i = 0; i < 26; i++) {
  if (cnt[i] % 2 !== 0) {
    odd++;
    mid = String.fromCharCode(65 + i);
  }
}

if (odd > 1) {
  console.log("I'm Sorry Hansoo");
  return;
}

let half = "";
for (let i = 0; i < 26; i++) {
  half += String.fromCharCode(65 + i).repeat(Math.floor(cnt[i] / 2));
}

const ans = half + mid + half.split("").reverse().join("");
console.log(ans);
