const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

class MinHeap {
  // 우선순위큐 배열 인덱스 규칙
  // parent(i) = (i-1) // 2
  // left(i) = 2*i + 1
  // right(i) = 2*i + 2
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    let i = this.heap.length - 1;

    while (i > 0) {
      let pIdx = Math.floor((i - 1) / 2);

      if (this.heap[pIdx] <= this.heap[i]) break;
      // 부모보다 현재 원소가 더 작을때 swap
      let tmp = this.heap[pIdx];
      this.heap[pIdx] = this.heap[i];
      this.heap[i] = tmp;
      i = pIdx;
    }
  }

  pop() {
    if (this.isEmpty()) return null;
    const top = this.heap[0];
    const end = this.heap.pop();

    if (this.isEmpty()) return top;

    this.heap[0] = end;

    let i = 0;
    while (1) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      let child;

      // 왼쪽 자식이 힙 범위 밖이면 더 내려갈 데가 없으니 break
      if (left > this.heap.length - 1) break;

      // 오른쪽 자식이 없으면 왼쪽 자식이 child
      if (right > this.heap.length - 1) child = left;
      // 오른쪽 자식이 있으면 두 개 중 작은 것이 child
      else child = this.heap[left] > this.heap[right] ? right : left;

      if (this.heap[i] <= this.heap[child]) break;

      let tmp = this.heap[i];
      this.heap[i] = this.heap[child];
      this.heap[child] = tmp;
      i = child;
    }

    return top;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

let N = Number(input[0]);
let heap = new MinHeap();

let arr = [];
for (let i = 0; i < N; i++) {
  let n = Number(input[i + 1]);
  if (n === 0) {
    if (heap.isEmpty()) arr.push(0);
    else {
      arr.push(heap.pop());
    }
  } else heap.push(n);
}

console.log(arr.join("\n"));
