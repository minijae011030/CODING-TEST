const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let output = [];
let visited = new Array(N).fill(false);

function backtrack(cnt, start) {
  if (cnt === M) {
    console.log(output.join(" "));
    return;
  }

  for (let i = start; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    output.push(i + 1);
    backtrack(cnt + 1, i + 1);
    output.pop(i + 1);
    visited[i] = false;
  }
}

backtrack(0, 0);
