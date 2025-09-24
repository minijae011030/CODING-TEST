const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let arr = input[1].split(" ").map(Number);

function solution() {
  if (N === 1) {
    return "A";
  } else if (N === 2) {
    if (arr[0] === arr[1]) {
      return arr[0];
    } else {
      return "A";
    }
  } else {
    if (arr[0] === arr[1]) {
      if (isAllNumberSame(0)) {
        return arr[0];
      } else {
        return "B";
      }
    } else {
      if (arr[1] === arr[2]) {
        if (isAllNumberSame(1)) {
          return arr[1];
        } else {
          return "B";
        }
      } else {
        if (findAB() === null) {
          return "B";
        }
        const { a, b } = findAB();
        if (!isAllNumFollowRule(a, b)) return "B";
        return arr[arr.length - 1] * a + b;
      }
    }
  }
}

function isAllNumberSame(startIdx) {
  const num = arr[startIdx];
  for (let i = startIdx + 1; i < arr.length; i++) {
    if (arr[i] !== num) return false;
  }

  return true;
}

function findAB() {
  /**
   * arr[1] = arr[0] * a + b
   * arr[2] = arr[1] * a + b
   *
   * b = arr[1] - arr[0] * a
   *
   * arr[2] = arr[1] * a + arr[1] - arr[0] * a
   *        = (arr[1] - arr[0]) * a + arr[1]
   *
   * a = (arr[2] - arr[1]) / (arr[1] - arr[0])
   */

  if (arr[1] === arr[0]) {
    if (arr[2] !== arr[1]) return null;
    return { a: 1, b: 0 }; // 모든 원소가 같은 경우
  }

  const numerator = arr[2] - arr[1];
  const denominator = arr[1] - arr[0];

  if (numerator % denominator !== 0) return null; // a가 정수가 아님
  const a = numerator / denominator;
  const b = arr[1] - arr[0] * a;

  return { a, b };
}

function isAllNumFollowRule(a, b) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] != arr[i - 1] * a + b) return false;
  }
  return true;
}

const result = solution();
console.log(result);
