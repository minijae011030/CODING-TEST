const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let suger = input.shift();
let bag = 0;

while (suger >= 0) {
  if (suger % 5 == 0) {
    bag += suger / 5;
    console.log(bag);
    return;
  }
  suger -= 3;
  bag++;
}

console.log("-1");
