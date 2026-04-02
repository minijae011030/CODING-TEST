const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);

let belt = input[1].split(" ").map(Number);
let robots = Array(N).fill(0);

let progress = 0;

while (1) {
  progress++;

  // 1. 벨트가 각 칸 위에 있는 로봇과 함께 한 칸 회전
  let last = belt.pop();
  belt.unshift(last);

  for (let i = N - 1; i > 0; i--) {
    robots[i] = robots[i - 1];
  }
  robots[0] = 0;
  robots[N - 1] = 0;

  // 2. 가장 먼저 벨트에 올라간 로봇부터, 벨트가 회전하는 방향으로 한 칸 이동할 수 있다면 이동한다. 만약 이동할 수 없다면 가만히 있는다.
  for (let i = N - 2; i >= 0; i--) {
    if (robots[i] && !robots[i + 1] && belt[i + 1] >= 1) {
      robots[i] = 0;
      robots[i + 1] = 1;
      belt[i + 1]--;

      if (i + 1 === N - 1) {
        robots[i + 1] = 0;
      }
    }
  }

  // 3. 올리는 위치에 있는 칸의 내구도가 0이 아니면 올리는 위치에 로봇을 올린다.
  if (belt[0] > 0) {
    robots[0] = 1;
    belt[0]--;
  }

  // 4. 내구도가 0인 칸의 개수가 K개 이상이라면 과정을 종료한다. 그렇지 않다면 1번으로 돌아간다.
  let zeroCnt = 0;
  for (let i = 0; i < N * 2; i++) {
    if (belt[i] === 0) zeroCnt++;
    if (zeroCnt >= K) return console.log(progress);
  }
}
