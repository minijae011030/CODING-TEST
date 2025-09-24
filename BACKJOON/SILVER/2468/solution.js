const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let n = Number(input.shift());
let graph = input.map((item) => item.split(" ").map(Number));

// 가장 높은 영역 계산
let MAX = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    MAX = Math.max(MAX, graph[i][j]);
  }
}

// 안전한 영역의 최대 개수 계산
let answer = 0;
for (let i = 0; i <= MAX; i++) {
  answer = Math.max(answer, findSafeArea(i));
}

console.log(answer);

/////////////////////////////////////////////

function findSafeArea(rain) {
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let map = input.map((item) => item.split(" ").map(Number));
  let safeArea = 0;
  let visited = Array.from({ length: n }, () => Array(n).fill(0));

  // 물에 잠겼는지 확인
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] <= rain) map[i][j] = 0;
      else map[i][j] = 1;
    }
  }

  // DFS로 안전한 영역 탐색
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && map[i][j]) {
        // 방문하지 않았으며 안전한 영역이면 DFS 수행
        safeArea++;
        DFS(i, j);
      }
    }
  }

  /////////////////////////////////////////////

  function DFS(i, j) {
    if (
      i >= 0 &&
      i < n &&
      j >= 0 &&
      j < n &&
      !visited[i][j] &&
      map[i][j] === 1
    ) {
      visited[i][j] = 1;
      for (let d of dir) {
        const [dx, dy] = [i + d[0], j + d[1]];
        DFS(dx, dy);
      }
    }
  }

  /////////////////////////////////////////////

  return safeArea;
}
