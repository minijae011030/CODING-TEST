const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let a1 = -1,
  a2 = -1,
  a3 = -1;
let sum = Infinity;

for (let i = 0; i < N; i++) {
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

    let tmp_sum = arr[i] + arr[left] + arr[right];
    if (tmp_sum == 0) {
      a1 = arr[i];
      a2 = arr[left];
      a3 = arr[right];
      break;
    } else if (tmp_sum < 0) {
      if (Math.abs(tmp_sum) < Math.abs(sum)) {
        sum = tmp_sum;
        a1 = arr[i];
        a2 = arr[left];
        a3 = arr[right];
      }
      left++;
    } else {
      if (Math.abs(tmp_sum) < Math.abs(sum)) {
        sum = tmp_sum;
        a1 = arr[i];
        a2 = arr[left];
        a3 = arr[right];
      }
      right--;
    }
  }
}

let result = [a1, a2, a3];

result.sort((a, b) => a - b);
console.log(result.join(" "));
