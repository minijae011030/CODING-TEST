const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [K, N] = input[0].split(" ").map(Number);
let arr = [];
for (let i = 0; i < K; i++) {
  arr.push(Number(input[i + 1]));
}

let start = 1;
let end = Math.max(...arr);

let ans = 0;
while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  if (canMakeCable(mid)) {
    start = mid + 1;
    ans = mid;
  } else {
    end = mid - 1;
  }
}

console.log(ans);

function canMakeCable(w) {
  let cnt = 0;
  let arr2 = [...arr];
  for (let i = 0; i < K; i++) {
    cnt += Math.floor(arr2[i] / w);
    if (cnt >= N) return true;
  }

  return cnt >= N;
}
