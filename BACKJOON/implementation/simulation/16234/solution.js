const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 인구 이동
 * NxN 크기의 땅
 * 각각의 땅에는 나라가 하나씩 존재
 * r행c열 -> A[r][c]명이 살고있음
 * 나라에는 국경선 존재 -> 모든 국경선은 정사각형
 *
 * 인구이동은 하루동안 다음과 같이 진행 -> 더 이상 인구이동이 없을때까지 지속
 *
 * - 국경선을 공유하는 두 나라의 인구 차이가 L이상, R이하 -> 두 나라를 공유하는 국경선을 하루동안 연다
 * - 위의 조건에 의해 열어야하는 국경선이 모두 열렸다면!! 인구이동 시작
 * - 국경선이 열려있어 인접한 칸만을 이용해 이동할 수 있으면 -> 두 나라 연합
 * - 연합을 이루고 있는 각 칸의 인구수 -> (연합의 인구수) / (연합을 이루고 있는 칸의 개수) -> 소수점 버림
 * - 연합을 해체하고 국경선 닫음
 *
 * 인구 이동이 며칠동안 발생하는지!
 */

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let idx = 0;
const [N, L, R] = input[idx++].split(" ").map(Number);

let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[idx++].split(" ").map(Number));
}

// 국경선이 열린걸 어떻게 표시?? 아니면 새로운 맵 만들어서?
let answer = 0;
while (1) {
  let movedPopulation = move();
  if (movedPopulation === 0) {
    console.log(answer);
    break;
  } else {
    answer++;
  }
}

function move() {
  let visited = Array.from({ length: N }, () => Array(N).fill(0));
  let isMoved = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 방문하지 않은 국가라면
      if (!visited[i][j]) {
        let queue = [[i, j]];
        let union = [[i, j]];
        visited[i][j] = 1;
        let population = map[i][j];

        let head = 0;
        while (queue.length > head) {
          let [x, y] = queue[head++];
          for (let [dx, dy] of direction) {
            let [nx, ny] = [x + dx, y + dy];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
              let diff = Math.abs(map[x][y] - map[nx][ny]);
              if (diff >= L && diff <= R) {
                visited[nx][ny] = 1;

                population += map[nx][ny];
                union.push([nx, ny]);
                queue.push([nx, ny]);
              }
            }
          }
        }

        if (union.length > 1) {
          isMoved = true;
          let newPopulation = Math.floor(population / union.length);
          for (let [ux, uy] of union) {
            map[ux][uy] = newPopulation;
          }
        }
      }
    }
  }

  return isMoved ? 1 : 0;
}
