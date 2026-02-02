const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [s1, s2] = input[0].split(" ");
let [l1, l2] = [s1.length, s2.length];

let min = l2;

for (let i = 0; i < l2 - l1 + 1; i++) {
  let padS1 = "0".repeat(i) + s1 + "0".repeat(l2 - i - s1.length);
  min = Math.min(calcDiff(padS1, s2), min);
}

console.log(min);

function calcDiff(s1, s2) {
  let diff = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== "0" && s1[i] !== s2[i]) diff++;
  }

  return diff;
}
