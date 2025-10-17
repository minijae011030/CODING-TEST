const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let string = input[0];

let ans = 0;

const words = ["c=", "c-", "dz=", "d-", "lj", "nj", "s=", "z="];
let idx = 0;
while (idx < string.length) {
  let w1 = string.slice(idx, idx + 2);
  let w2 = string.slice(idx, idx + 3);

  if (words.includes(w1)) {
    ans++;
    idx += 2;
  } else if (words.includes(w2)) {
    ans++;
    idx += 3;
  } else {
    ans++;
    idx += 1;
  }
}

console.log(ans);
