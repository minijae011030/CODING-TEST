const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = Number(input.shift());
let E = Number(input.shift());

let computerArr = Array.from({ length: N }, () => []);
let infected = new Array(N).fill(0);

for (let i = 0; i < E; i++) {
  const [g1, g2] = input.shift().split(" ").map(Number);
  computerArr[g1 - 1].push(g2 - 1);
  computerArr[g2 - 1].push(g1 - 1);
}

DFS(0);

console.log(infected.reduce((acc, cur) => acc + cur, 0) - 1);

function DFS(computer) {
  infected[computer] = 1;

  for (let c of computerArr[computer]) {
    if (!infected[c]) {
      DFS(c);
    }
  }
}
