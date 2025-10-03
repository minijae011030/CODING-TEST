const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let arr = input[1].split(" ").map(Number);
let ans = [];
for (let h = N; h >= 1; h--) {
  ans.splice(arr[h - 1], 0, h); // i번째에 arr[h-1]을 삽입
}
console.log(ans.join(" "));

/**
 * 큰 키부터 차례로 리스트에 삽입하기
 * arr[i] 는 키 i+1의 왼쪽에 있는 더 큰 사람의 수
 * 키 h인 사람은 자기보다 큰 사람이 왼쪽에 cnt[h-1]명 있어야 함
 * 그런데 이미 세운 사람들은 전부 자기보다 큰 사람뿐
 * 따라서 현재 줄의 왼쪽에서 cnt[h-1]번째 위치에 끼워 넣으면 조건 충족
 */
