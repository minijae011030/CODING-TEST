const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, k] = input[0].split(" ").map(Number);

let coins = [];

for (let i = 0; i < n; i++) {
  let coin = Number(input[i + 1]);
  if (coin <= k) coins.push(coin);
}

coins.sort((a, b) => b - a);

let ans = 0;

for (let i = 0; i < coins.length; i++) {
  ans += Math.floor(k / coins[i]);
  k = k % coins[i];
}

console.log(ans);
