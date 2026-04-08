const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 소스코드 뒤죽박죽 인덴트 고침
 * 인덴트: 각 줄을 탭키를 이용해 들여쓰는거
 * 편집기는 연속된 줄을 그룹으로 선택, 각 줄의 앞에 탭 추가/삭제 가능
 * 이쁘게 고치는 방법 생각
 *
 * 줄의 개수 N, 각 줄의 앞에 있는 탭의 개수, 올바른 탭의 개수가 주어짐
 *
 * 한번 편집 시 다음과 같은 명령 수행 가능
 *
 * - 연속된 줄을 그룹으로 선택
 * - 선택된 줄의 앞에 탭 1개 추가/삭제
 *
 * 두 명령을 모두 수행하는것이 하나의 편집
 * 선택된 줄의 개수와는 상관이 없음
 *
 * 선택한 줄 중에 단 한줄이라도 탭이 없으면 탭 삭제 명령 수행 불가
 *
 * 몇 번의 편집만에 코드 인덴트 올바르게 고칠수있나 -> 최솟값
 */

function solution() {
  // 줄의 개수
  const N = Number(input[0]);

  // 현재 줄에 있는 탭의 개수 0 <= t <- 80
  let curTabs = input[1].split(" ").map(Number);

  // 올바른 탭의 개수 0 <= t <- 80
  let rightTabs = input[2].split(" ").map(Number);

  let diff = [];
  for (let i = 0; i < N; i++) {
    diff.push(curTabs[i] - rightTabs[i]);
  }

  let cnt = 0;

  let start = 0;
  let end = 0;

  while (1) {
    let notZeroCnt = 0;
    for (let i = 0; i < N; i++) {
      if (diff[i] !== 0) {
        notZeroCnt++;
      }
    }
    if (notZeroCnt === 0) return cnt;

    for (let i = 0; i < N; i++) {
      if (diff[i] !== 0) {
        start = i;
        end = i;
        break;
      }
    }

    for (let i = start; i < N; i++) {
      if (Math.sign(diff[start]) * Math.sign(diff[i]) !== 1) break;
      end = i;
    }

    let minTab =
      diff[start] > 0
        ? Math.min(...diff.slice(start, end + 1)) * -1
        : Math.max(...diff.slice(start, end + 1)) * -1;

    cnt += Math.abs(minTab);
    for (let i = start; i <= end; i++) diff[i] += minTab;
  }
}

console.log(solution());
