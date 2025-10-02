const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let switchN = Number(input[0]);
let switchStatus = input[1].split(" ").map(Number);
let n = Number(input[2]);

for (let i = 0; i < n; i++) {
  let [g, s] = input[i + 3].split(" ").map(Number);
  if (g === 1) {
    // 남자이면 번호 배수 상태 toggle
    for (let j = 0; j < switchN; j++) {
      if ((j + 1) % s === 0) {
        switchStatus[j] = toggle(switchStatus[j]);
      }
    }
  } else {
    // 여자이면 좌우대칭인 범위 상태 toggle
    if (s > switchN || s < 0) continue;
    let range = 0;
    for (let j = 0; j < switchN / 2; j++) {
      if (switchStatus[s + j - 1] > switchN || switchStatus[s - j - 1] < 0) {
        break;
      }
      if (switchStatus[s + j - 1] !== switchStatus[s - j - 1]) {
        break;
      }
      range++;
    }
    let start = s - range;
    let end = s + range - 2;
    for (let j = start; j <= end; j++) {
      switchStatus[j] = toggle(switchStatus[j]);
    }
  }
}
let out = [];
for (let i = 0; i < switchN; i++) {
  out.push(String(switchStatus[i]));
  if ((i + 1) % 20 === 0) {
    console.log(out.join(" "));
    out = [];
  }
}
if (out.length) console.log(out.join(" "));

function toggle(s) {
  if (s === 0) return 1;
  return 0;
}
