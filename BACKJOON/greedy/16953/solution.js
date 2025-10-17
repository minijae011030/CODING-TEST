const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [A, B] = input[0].split(" ").map(Number);

let cnt = 1;

while (B > A) {
  if (B % 10 === 1) {
    B = (B - 1) / 10;
    cnt++;
  } else if (B % 2 === 0) {
    B = B / 2;
    cnt++;
  } else {
    break;
  }
}

console.log(B === A ? cnt : -1);
