const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let result = "";
let output = [];

function backtrack(cnt, start) {
  if (cnt === M) {
    result += output.join(" ") + "\n";
    return;
  }

  for (let i = start; i < N; i++) {
    output.push(i + 1);
    backtrack(cnt + 1, i);
    output.pop();
  }
}

backtrack(0, 0);
console.log(result);
