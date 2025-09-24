const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 0; i < R; i++) {
  arr.push(input[i + 1].split(" ").map(Number));
}
const T = Number(input[R + 1]);

const MArr = [];

for (let i = 0; i < R - 2; i++) {
  for (let j = 0; j < C - 2; j++) {
    const filteredValue = [
      arr[i][j],
      arr[i][j + 1],
      arr[i][j + 2],
      arr[i + 1][j],
      arr[i + 1][j + 1],
      arr[i + 1][j + 2],
      arr[i + 2][j],
      arr[i + 2][j + 1],
      arr[i + 2][j + 2],
    ];

    MArr.push(findMiddleValue(filteredValue));
  }
}

let n = 0;
for (let i = 0; i < MArr.length; i++) {
  if (MArr[i] >= T) n++;
}
console.log(n);

function findMiddleValue(arr) {
  const sortedArr = arr.sort((a, b) => a - b);

  return sortedArr[Math.floor(sortedArr.length / 2)];
}
