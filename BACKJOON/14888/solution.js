const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const [plus, minus, multiply, divide] = input[2].split(" ").map(Number);

let max = -Infinity;
let min = Infinity;

function backtrack(index, result, p, m, mul, d) {
  if (index === N) {
    max = Math.max(max, result);
    min = Math.min(min, result);
    return;
  }

  if (p > 0) {
    backtrack(index + 1, result + A[index], p - 1, m, mul, d);
  }
  if (m > 0) {
    backtrack(index + 1, result - A[index], p, m - 1, mul, d);
  }
  if (mul > 0) {
    backtrack(index + 1, result * A[index], p, m, mul - 1, d);
  }
  if (d > 0) {
    const new_res =
      result < 0
        ? -Math.floor(Math.abs(result) / A[index])
        : Math.floor(result / A[index]);
    backtrack(index + 1, new_res, p, m, mul, d - 1);
  }
}

backtrack(1, A[0], plus, minus, multiply, divide);
console.log(`${max}\n${min}`);
