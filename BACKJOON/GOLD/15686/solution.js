const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = [];
for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split(" ").map(Number));
}

const chickenArr = [];
const customerArr = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 2) chickenArr.push([i, j]);
    if (map[i][j] === 1) customerArr.push([i, j]);
  }
}

const filteredChickenArr = [];
let visited = Array.from({ length: chickenArr.length }).fill(0);
let output = [];
function backtrack(start, cnt) {
  if (cnt === M) {
    filteredChickenArr.push([...output]);
  }

  for (let i = start; i < chickenArr.length; i++) {
    if (visited[i]) continue;
    visited[i] = 1;
    output.push(chickenArr[i]);
    backtrack(i + 1, cnt + 1);
    output.pop();
    visited[i] = 0;
  }
}

backtrack(0, 0);

let min = Infinity;
for (let i = 0; i < filteredChickenArr.length; i++) {
  let chickenList = filteredChickenArr[i];
  let sum = 0;
  for (let j = 0; j < customerArr.length; j++) {
    let minDistPerCustomer = Infinity;
    for (let k = 0; k < chickenList.length; k++) {
      minDistPerCustomer = Math.min(
        minDistPerCustomer,
        calcDist(
          chickenList[k][0],
          chickenList[k][1],
          customerArr[j][0],
          customerArr[j][1]
        )
      );
    }
    sum += minDistPerCustomer;
  }
  min = Math.min(min, sum);
}

console.log(min);

function calcDist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
