const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

const output = []; // 지금까지 만든 수열을 임시로 저장하는 배열
const visited = new Array(N).fill(false); // 각 숫자를 사용했는지 체크하는 배열

function backtrack(cnt) {
  // cnt: 지금까지 뽑은 숫자 개수
  // M개까지 순열이 완성되면 출력 완료
  if (cnt === M) {
    console.log(output.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue; // 사용했으면 통과

    visited[i] = true; // 사용처리
    output.push(i + 1);
    backtrack(cnt + 1); // 다음 숫자를 고르러 재귀 호출

    output.pop(); // 재귀가 끝나고 돌아오면 사용처리 해제
    visited[i] = false;
  }
}

backtrack(0);
