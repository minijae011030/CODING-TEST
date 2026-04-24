const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 뱀과 사다리 게임
 *
 * 주사위를 조작해 내가 원하는 수가 나오게 만들수 있다면 최소 몇번만에 도착점에 도착?
 *
 * 주사위 1~6까지
 * 크기가 10x10, 총 100개의 칸으로 나뉜 보드판
 * 1~100 수가 하나씩 적혀잇음
 *
 * 주사위를 굴려 나오는 수만큼 이동
 * 플레이어가 i번 칸에 있고 4가 나오면 i+4번 칸으로 이동
 * 주사위를 굴린결과가 100이 넘으면 이동x
 *
 * 도착한 칸이 사다리면 사다리 타고 위로 올라감 -> 원래 있던 칸의 번호보다 크고
 * 뱀이 있는 칸이면 뱀을 타고 내려감 -> 원래 있던 칸의 번호보다 작다
 *
 * 1번 칸에서 100번 칸에 도착하기
 * 100번 칸에 도착하기 위해 굴려야 하는 횟수의 최솟값
 */

let idx = 0;
const [N, M] = input[idx++].split(" ").map(Number);

let ladders = []; // 사다리 정보
let snakes = []; // 뱀의 정보

for (let i = 0; i < N; i++) {
  ladders.push(input[idx++].split(" ").map(Number));
}

for (let i = 0; i < M; i++) {
  snakes.push(input[idx++].split(" ").map(Number));
}

// let map = Array.from({ length: 10 }, () => Array(10));

// let n = 1;
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     map[i][j] = [n, n++];
//   }
// }

// for (let i = 0; i < N; i++) {
//   let info = ladders[i];
//   let x = Math.floor(info[0] / 10);
//   let y = info[0] % 10;
//   map[x][y - 1] = [info[0], info[1]];
// }

// for (let i = 0; i < M; i++) {
//   let info = snakes[i];
//   let x = Math.floor(info[0] / 10);
//   let y = info[0] % 10;
//   map[x][y - 1] = [info[0], info[1]];
// }

let board = Array(101)
  .fill(0)
  .map((_, i) => i);
for (const [from, to] of ladders) board[from] = to;
for (const [from, to] of snakes) board[from] = to;

let visited = Array(101).fill(0);

let queue = [[board[1], 0]];
visited[1] = 1;

let qIdx = 0;
while (queue.length > qIdx) {
  let [curr, dist] = queue[qIdx++];
  if (curr === 100) {
    console.log(dist);
    break;
  }

  for (let i = 1; i <= 6; i++) {
    let next = curr + i;

    if (next <= 100) {
      next = board[next];

      if (!visited[next]) {
        visited[next] = 1;
        queue.push([next, dist + 1]);
      }
    }
  }
}
