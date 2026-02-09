const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
let n = input.length;

let uniq = Array.from(input).sort();

let answer = new Map();
for (let i = 0; i < uniq.length; i++) {
  answer.set(uniq[i], (answer.get(uniq[i]) ?? 0) + 1);
}

let tree = [...answer.keys()].sort();

tree.forEach((t) => {
  let cnt = answer.get(t);
  console.log(t, ((cnt / n) * 100).toFixed(4));
});
