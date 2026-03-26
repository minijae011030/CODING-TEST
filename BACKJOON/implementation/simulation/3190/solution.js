const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
let N = Number(input[idx++]);
let K = Number(input[idx++]);

let apples = [];
for (let i = 0; i < K; i++) {
  let [x, y] = input[idx++].split(" ").map(Number);
  apples.push([x - 1, y - 1]);
}

let L = Number(input[idx++]);
let cmd = [];
for (let i = 0; i < L; i++) {
  let [X, C] = input[idx++].split(" ");
  cmd.push([Number(X), C]);
}

/**
 * 게임이 몇 초에 끝나는지 리턴하는 함수
 * @param {*} N 보드의 크기
 * @param {*} K 사과의 갯수
 * @param {*} apples 사과의 위치 배열 [x, y]
 * @param {*} cmd 방향 변환 정보 배열 [게임 시작 시간으로부터 x초, cmd]
 */
function solution(N, K, apples, cmd) {
  // 0: 빈칸, 1: 사과, 2: 뱀
  let board = Array.from({ length: N }, () => Array(N).fill(0));
  for (let i = 0; i < K; i++) board[apples[i][0]][apples[i][1]] = 1;

  board[0][0] = 2;

  let time = 0;
  let snake = [[0, 0]];

  let direction = [
    [-1, 0], // 위쪽
    [0, 1], // 오른쪽
    [1, 0], // 아래
    [0, -1], // 왼쪽
  ];

  let curDirIdx = 1;

  while (1) {
    time++;

    let [nx, ny] = [
      snake[0][0] + direction[curDirIdx][0],
      snake[0][1] + direction[curDirIdx][1],
    ];

    // 벽이라면
    if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
      return time;
    }

    // 뱀이라면
    if (board[nx][ny] === 2) {
      return time;
    }

    // 사과 아니라면 꼬리 제거
    if (board[nx][ny] !== 1) {
      let [tx, ty] = snake.pop();
      board[tx][ty] = 0;
    }

    // 앞으로 가기
    snake.unshift([nx, ny]);
    board[nx][ny] = 2;

    // 방향전환
    if (cmd.length > 0 && cmd[0][0] === time) {
      let [_, dir] = cmd.shift();

      /**
       * L: 왼쪽 90도 회전
       * 왼 -> 아
       * 아 -> 오
       * 오 -> 위
       * 위 -> 왼
       * D: 오른쪽 90도 회전
       * 왼 -> 위
       * 아 -> 왼
       * 오 -> 아
       * 위 -> 오
       */

      if (dir === "L") {
        // 왼쪽 방향전환
        curDirIdx = (curDirIdx + 3) % 4;
      } else {
        // 오른쪽 방향전환
        curDirIdx = (curDirIdx + 1) % 4;
      }
    }
  }

  return time;
}

console.log(solution(N, K, apples, cmd));
