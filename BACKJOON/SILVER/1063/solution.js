const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 8*8 크기의 체스판
 * 현재 킹의 위치가 주어짐
 * 말의 위치: 알파벳+숫자 -> 알파벳: 열, 숫자: 행
 * 열: A~H
 * 행: 1~8
 *
 * 이동
 * R: 한칸 오른쪽 [0, 1]
 * L: 한칸 왼쪽 [0. -1]
 * B: 한칸 아래 [1, 0]
 * T: 한칸 위 [-1. 0]
 * RT: 오른쪽 위 대각선 [-1, 1]
 * LT: 왼쪽 위 대각선 [-1, -1]
 * RB: 오른쪽 아래 대각선 [1, 1]
 * LB: 왼쪽 아래 대각선 [1, -1]
 *
 * 체스판에 돌이 하나 있음
 * 돌과 같은 곳으로 이동 시에 돌을 킹이 움직인 방향과 같은 방향으로 한칸 이동
 * 이동시 킹이나 돌이 체스판 밖으로 나갈경우 이동 건너뜀
 *
 * 첫째줄: 킹의 위치, 돌의 위치, 움직이는 횟수 N이 주어짐
 * 둘째줄: N개의 줄에 킹이 어떻게 움직이는지 주어짐
 *
 * N <= 50 자연수
 */

let [KP, RP, N] = input[0].split(" ");
let moveArr = [];
for (let i = 0; i < N; i++) {
  moveArr.push(input[i + 1]);
}

for (move of moveArr) {
  command(move);
}
console.log(KP);
console.log(RP);

function addChar(c, n) {
  return String.fromCharCode(c.charCodeAt(0) + n);
}

function command(c) {
  let newPos;
  switch (c) {
    case "R":
      if (KP[0] === "H") return;
      newPos = addChar(KP[0], 1) + KP[1];
      break;
    case "L":
      if (KP[0] === "A") return;
      newPos = addChar(KP[0], -1) + KP[1];
      break;
    case "T":
      if (KP[1] === "8") return;
      newPos = KP[0] + addChar(KP[1], 1);
      break;
    case "B":
      if (KP[1] === "1") return;
      newPos = KP[0] + addChar(KP[1], -1);
      break;
    case "RT":
      if (KP[0] === "H" || KP[1] === "8") return;
      newPos = addChar(KP[0], 1) + addChar(KP[1], 1);
      break;
    case "LT":
      if (KP[0] === "A" || KP[1] === "8") return;
      newPos = addChar(KP[0], -1) + addChar(KP[1], 1);
      break;
    case "RB":
      if (KP[0] === "H" || KP[1] === "1") return;
      newPos = addChar(KP[0], 1) + addChar(KP[1], -1);
      break;
    default:
      if (KP[0] === "A" || KP[1] === "1") return;
      newPos = addChar(KP[0], -1) + addChar(KP[1], -1);
      break;
  }

  if (newPos === RP) {
    switch (c) {
      case "R":
        if (RP[0] === "H") return;
        RP = addChar(RP[0], 1) + RP[1];
        break;
      case "L":
        if (RP[0] === "A") return;
        RP = addChar(RP[0], -1) + RP[1];
        break;
      case "T":
        if (RP[1] === "8") return;
        RP = RP[0] + addChar(RP[1], 1);
        break;
      case "B":
        if (RP[1] === "1") return;
        RP = RP[0] + addChar(RP[1], -1);
        break;
      case "RT":
        if (RP[0] === "H" || RP[1] === "8") return;
        RP = addChar(RP[0], 1) + addChar(RP[1], 1);
        break;
      case "LT":
        if (RP[0] === "A" || RP[1] === "8") return;
        RP = addChar(RP[0], -1) + addChar(RP[1], 1);
        break;
      case "RB":
        if (RP[0] === "H" || RP[1] === "1") return;
        RP = addChar(RP[0], 1) + addChar(RP[1], -1);
        break;
      default:
        if (RP[0] === "A" || RP[1] === "1") return;
        RP = addChar(RP[0], -1) + addChar(RP[1], -1);
        break;
    }
  }

  KP = newPos;
}
