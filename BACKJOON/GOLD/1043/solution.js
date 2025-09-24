const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

function find(x) {
  // 원소 x가 속한 집합의 대표 찾기
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  // a와 b가 속한 집합을 합치기
  a = find(a);
  b = find(b);
  if (a !== b) parent[b] = a; // 한쪽에 붙여줌
}

const [N, M] = input[0].split(" ").map(Number);
let truth = input[1].split(" ").map(Number).slice(1); // 진실을 아는 사람이 0명이라면 모든 파티에서 과장 가능
let parent = Array.from({ length: N + 1 }, (_, i) => i);

let parties = [];
for (let i = 0; i < M; i++) {
  let arr = input[i + 2].split(" ").map(Number);
  let members = arr.slice(1); // 이 파티의 참석자 목록
  parties.push(members);

  // 같은 파티 참석자들을 한 집합으로 묶는다
  for (let j = 1; j < members.length; j++) {
    union(members[0], members[j]);
  }
}

// 진실 아는 집합들의 대표 저장
// 어떤 사람이 이 root 중 하나와 같은 root면 진실 집합에 속한다고 판단
let truthRoots = new Set(truth.map(find));

let ans = 0;
for (let party of parties) {
  let canLie = true;
  for (let person of party) {
    if (truthRoots.has(find(person))) {
      canLie = false;
      break;
    }
  }
  if (canLie) ans++;
}

console.log(ans);
