const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let asw = 0;

for (let i = 0; i < N; i++) {
  const target = arr[i];
  let left = 0;
  let right = N - 1;

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }

    let sum = arr[left] + arr[right];

    if (sum === target) {
      asw++;
      break;
    } else if (sum < target) {
      left += 1;
    } else {
      right -= 1;
    }
  }
}

console.log(asw);
