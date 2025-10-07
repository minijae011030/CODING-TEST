const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, m] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

const result = [];
const output = [];

const visited = Array.from(n).fill(0);

function backtrack(depth) {
  if (depth === m) {
    result.push(output.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    visited[i] = 1;
    output.push(arr[i]);
    backtrack(depth + 1);
    output.pop();
    visited[i] = 0;
  }
}

backtrack(0);
console.log(result.join("\n"));
