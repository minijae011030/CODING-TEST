function solution(users, emoticons) {
  /*
    이모티콘 할인행사
    
    이모티콘 플러스 가입자 수 늘리기
    
    목표: 1번이 우선, 2번이 그 다음
    1. 이모티콘 플러스 서비스 가입자 최대한 늘리기
    2. 이모티콘 판매액 최대한 늘리기
    
    
    할인 행사 진행 방식
    - n명의 카톡 사용자들에게 이모티콘 m개를 할인 판매
    - 이모티콘마다 할인율은 다를수있음 10, 20, 30, 40% 중 하나로 설정
    
    사용자들이 이모티콘을 사거나 이모티콘 플러스를 가입하는 기준
    - 자신의 기준에 따라 일정 비율 이상 할인하는 이모티콘 모두 구매
    - 자신의 기준에 따라 이모티콘 구매 비용의 합이 일정 가격 이상이 되면, 구매 모두 취소하고 이모티콘 플러스 가입
    
    카카오톡 사용자 n명의 구매 기준을 담은 2차원 정수 배열 users [비율, 가격]
    이모티콘 m개의 정가를 담은 1차원 정수 배열 emoticons
    
    목적 최대 달성 시의 [이모티콘 플러스 가입자 수, 이모티콘 매출액] 리턴

    이모티콘마다 할인율이 다를수있다!!!!!
    */

  let answer = [0, 0];
  let m = emoticons.length;

  let discounts = [10, 20, 30, 40];

  function backtrack(cur) {
    if (cur.length === m) {
      let [curPlus, curBuy] = cal(cur);

      if (answer[0] < curPlus) answer = [curPlus, curBuy];
      if (answer[0] === curPlus && answer[1] < curBuy)
        answer = [curPlus, curBuy];

      return;
    }

    for (let d of discounts) {
      cur.push(d);
      backtrack(cur);
      cur.pop();
    }
  }

  backtrack([]);

  function cal(dCase) {
    // case = [d1, d2] 이모티콘별로 할인율
    let plus = 0;
    let buy = 0;
    for (let user of users) {
      let minDiscount = user[0];
      let maxPrice = user[1];

      let tmpPrice = 0;
      for (let i = 0; i < m; i++) {
        if (dCase[i] >= minDiscount) {
          tmpPrice += emoticons[i] * (1 - dCase[i] / 100);
        }
      }

      if (tmpPrice >= maxPrice) {
        plus++;
      } else {
        buy += tmpPrice;
      }
    }

    return [plus, buy];
  }

  return answer;
}
