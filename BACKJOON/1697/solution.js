const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);

const MAX = 100000;
let visited = Array(MAX + 1).fill(false);

let queue = [[N, 0]];
visited[N] = 1;

while (queue.length) {
  let [pos, time] = queue.shift();
  if (pos === K) return console.log(time);

  let nextPos = [pos - 1, pos + 1, pos * 2];
  for (let next of nextPos) {
    if (!visited[next] && next >= 0 && next <= MAX) {
      visited[next] = 1;
      queue.push([next, time + 1]);
    }
  }
}

return 0;
