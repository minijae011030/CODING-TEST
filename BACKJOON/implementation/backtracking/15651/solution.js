const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let output = [];
let result = "";
function backtrack(cnt) {
  if (cnt === M) {
    result += output.join(" ") + "\n";
    return;
  }

  for (let i = 0; i < N; i++) {
    output.push(i + 1);
    backtrack(cnt + 1);
    output.pop();
  }
}

backtrack(0);

console.log(result);
