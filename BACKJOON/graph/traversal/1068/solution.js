const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 리프노드: 자식의 개수가 0인 노드
 * 트리가 주어졌을 때 노드를 하나 지움
 * 남은 트리에서 리프 노드의 개수 구하기
 *
 */

const N = Number(input[0]);
const parent = input[1].split(" ").map(Number);
const del = Number(input[2]);

let root = -1;
let children = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  if (parent[i] === -1) {
    root = i;
  } else {
    children[parent[i]].push(i);
  }
}

if (root === del) {
  console.log(0);
  return;
}

console.log(DFS(root));

function DFS(u) {
  if (u === del) return 0; // 삭제된 노드는 0을 리턴

  let sum = 0;
  let validChild = 0;

  for (const v of children[u]) {
    if (v === del) continue;
    validChild++;
    sum += DFS(v);
  }

  if (validChild === 0) return 1; // 살아있는데 자식이 없다면 1을 리턴
  return sum; // 살아있는데 자식이 있으면 자식 리프 합을 리턴
}
