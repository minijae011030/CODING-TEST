const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

let visited = Array(1000001).fill(0);

let queue = [[N, 0]]; // 위치, 시간
visited[N] = 1;

while (queue.length > 0) {
  let [pos, time] = queue.shift();
  if (pos === K) {
    console.log(time);
    return;
  }

  for (let next of [pos - 1, pos + 1, pos * 2]) {
    if (next >= 0 && next <= 100000 && !visited[next]) {
      queue.push([next, time + 1]);
      visited[next] = 1;
    }
  }
}
