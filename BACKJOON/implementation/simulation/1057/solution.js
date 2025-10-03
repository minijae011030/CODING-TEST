const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, A, B] = input[0].split(" ").map(Number);
let cnt = 0;
while (1) {
  if (A === B) {
    console.log(cnt);
    return;
  }

  A = Math.floor((A + 1) / 2);
  B = Math.floor((B + 1) / 2);

  cnt++;
}
