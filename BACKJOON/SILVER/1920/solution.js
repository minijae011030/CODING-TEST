const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let NArray = input[1].split(" ").map(Number);
let M = input[2];
let MArray = input[3].split(" ").map(Number);

NArray.sort((a, b) => a - b);

for (let i = 0; i < M; i++) {
  const m = MArray[i];
  if (binarySearch(NArray, m)) {
    console.log(1);
  } else {
    console.log(0);
  }
}

function binarySearch(array, element) {
  let start = 0;
  let end = NArray.length - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (array[mid] == element) {
      return 1;
    } else if (array[mid] > element) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return 0;
}
