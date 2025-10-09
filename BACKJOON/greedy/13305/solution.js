const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
let dist = input[1].split(" ").map((v) => BigInt(v));
let price = input[2].split(" ").map((v) => BigInt(v));

let minPrice = price[0];

let sum = 0n;
for (let i = 0; i < n - 1; i++) {
  if (price[i] < minPrice) minPrice = price[i];
  sum += dist[i] * minPrice;
}
console.log(sum.toString());
