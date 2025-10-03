const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);

let rooms = [];
for (let i = 0; i < n; i++) {
  rooms.push(input[i + 1].split(" ").map(Number));
}
rooms.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let endTime = rooms[0][1];
let cnt = 1;
for (let i = 1; i < rooms.length; i++) {
  if (rooms[i][0] >= endTime) {
    endTime = rooms[i][1];
    cnt++;
  }
}

console.log(cnt);
