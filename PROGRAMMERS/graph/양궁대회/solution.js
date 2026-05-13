function solution(n, info) {
  /*
    양궁대회
    
    어피치가 n발 쏜 다음에 라이언이 n발 쏨
    만약 k점을 어피치가 a발 맞혔고, 라이언이 b발 맞히면 더 많은 화살 k에 맞힌 선수가 k점을 가져간다
    단 a=b 인 경우 어피치가 k점을 가져간다
    k점을 여러발 맞혀도 k점만 가져간다
    a=b=0인 경우 -> 라이언과 어피치 모두 k점에 단 하나의 화살도 맞히지 못한 경우 누구도 k점을 가져가지 않는다
    최종 점수가 더 높은 선수 우승자 -> 동점인 경우 어피치가 우승자
    
    현재 상황: 어피치가 n발을 다 쏘고 라이언이 화살을 솔 차례
    라이언이 어피치를 가장 큰 점수 차이로 이기기 위해 n발의 화살을 어떤 과녁에 맞춰야하는지를 구하자
    
    화살의 개수 n, 어피치가 맞힌 과녁 점수 개수 정수 배열 info
    라이언이 어떻게 맞혀야 하는지 정수 배열에 담아 return
    라이언이 우승할 수 없으면 -1 리턴
    
    라이언이 가장 큰 점수로 우승할 수 있는 방법이 여러가지인 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return
    */

  // 한발을 더 쏴서 점수 가져오거나! 아예 안쏴서 점수 포기하거나! 둘중에 하나?

  let max = 0;
  let answer = [-1];

  let lionInfo = Array(11).fill(0);

  function dfs(idx, arrow) {
    if (idx === 11) {
      // 남은 화살이 있으면 0점에 다 몰아주기
      if (arrow > 0) {
        lionInfo[10] += arrow;
      }

      let a = 0; // 어피치
      let b = 0; // 라이언

      // 어피치 라이언 점수 계산
      for (let i = 0; i <= 10; i++) {
        // 둘다 영점이면 건너뛰기
        if (info[i] === 0 && lionInfo[i] === 0) continue;

        // 어피치가 더 많거나 같은 점수로 맞히면 어피치가 가져감
        if (info[i] >= lionInfo[i]) a += 10 - i;
        // 아니면 라이언이 가져감
        else b += 10 - i;
      }

      let diff = b - a;
      // 라이언이 점수가 더 높으면서 max보다 같거나 많이 득점한 경우
      if (diff > 0 && diff >= max) {
        // max보다 크게 득점하거나 우선순위가 더 높은 경우
        if (diff > max || calc(lionInfo, answer)) {
          max = diff;
          answer = [...lionInfo];
        }
      }

      if (arrow > 0) lionInfo[10] -= arrow;
      return;
    }

    // 어피치보다 더 많이 쏠수있는 경우
    if (info[idx] < arrow) {
      lionInfo[idx] = info[idx] + 1;
      dfs(idx + 1, arrow - (info[idx] + 1), lionInfo);
      lionInfo[idx] = 0;
    }

    // 점수 그냥 버리기
    dfs(idx + 1, arrow);
  }

  dfs(0, n);

  return answer;
}

function calc(info1, info2) {
  for (let i = 10; i >= 0; i--) {
    if (info1[i] > info2[i]) return true;
    if (info1[i] < info2[i]) return false;
  }

  return false;
}
