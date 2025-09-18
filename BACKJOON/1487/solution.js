const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const people = [];
const prices = [];
let max_benefit = 0;
let max_price = 0;
for (let i = 1; i <= N; i++) {
  const [price, fee] = input[i].split(" ").map(Number);
  people.push(input[i].split(" ").map(Number));
  prices.push(price);
}
prices.sort((a, b) => a - b);
const min_cost = prices[0];
const max_cost = prices[prices.length - 1];

for (let i = min_cost; i <= max_cost; i++) {
  let benefit = 0;
  const current_price = i;
  for (let p of people) {
    if (p[0] >= current_price) {
      if (current_price - p[1] >= 0) {
        benefit += current_price - p[1];
      }
    }
  }
  if (max_benefit < benefit) {
    max_benefit = Math.max(max_benefit, benefit);
    max_price = i;
  }
}

console.log(max_price);
