const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = Number(input[0]);
let arr = [];
let result = [];
let head = 0,
  tail = 0;
for (let i = 0; i < n; i++) {
  let [cmd, n] = input[i + 1].split(" ");
  if (cmd === "push") push(n);
  else if (cmd === "pop") result.push(pop());
  else if (cmd === "size") result.push(size());
  else if (cmd === "empty") result.push(empty());
  else result.push(top());
}

console.log(result.join("\n"));

function push(x) {
  arr[tail] = x;
  tail++;
}

function pop() {
  if (head === tail) {
    return -1;
  }
  let e = arr[tail - 1];
  tail--;
  return e;
}

function size() {
  return tail - head;
}

function empty() {
  if (head === tail) {
    return 1;
  }

  return 0;
}

function top() {
  if (head === tail) {
    return -1;
  }

  return arr[tail - 1];
}
