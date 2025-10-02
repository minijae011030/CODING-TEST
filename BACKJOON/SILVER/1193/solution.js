const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

let sum = 2;
let cnt = 1;
while (1) {
  if (sum % 2 === 0) {
    let b = 1,
      a = sum - b;
    for (let i = 0; i < sum - 1; i++) {
      if (cnt === n) {
        console.log("%d/%d", a, b);
        return;
      }
      cnt++;
      a--;
      b++;
    }
  } else {
    let a = 1,
      b = sum - a;
    for (let i = sum - 2; i >= 0; i--) {
      if (cnt === n) {
        console.log("%d/%d", a, b);
        return;
      }
      cnt++;
      a++;
      b--;
    }
  }

  sum++;
}
