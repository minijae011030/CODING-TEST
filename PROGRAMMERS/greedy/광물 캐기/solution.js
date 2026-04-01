function solution(picks, minerals) {
  /*
    작업을 끝내기까지 최소한의 피로도를 return
    
    사용할 수 있는 곡괭이 중 아무거나 하나 선택해 광물을 캔다
    한번 사용하기 시작한 곡괭이는 사용할 수 없을 때까지 사용
    광물은 주어진 순서대로만 캘수있음
    광물을 모두 제거 or 곡괭이가 없을때까지 실행
    
    곡괭이 선택 -> 광물 5개 제거 -> 곡괭이 선택 -> 광물 5개 제거'
    
    각 곡괭이는 1개 이상 5개 이하
    */

  // 총 곡괭이의 수
  let picksCnt = picks.reduce((acc, cur) => acc + cur);

  // 캘 수 있는 광물만 남기기
  minerals = minerals.slice(0, picksCnt * 5);

  // 각 그룹마다 다이아, 철, 돌 개수
  let groupArr = [];

  for (let i = 0; i < minerals.length; i += 5) {
    let dia = 0;
    let iron = 0;
    let stone = 0;
    for (let j = i; j < Math.min(i + 5, minerals.length); j++) {
      if (minerals[j] === "diamond") dia++;
      else if (minerals[j] === "iron") iron++;
      else stone++;
    }

    groupArr.push([dia, iron, stone]);
  }

  groupArr.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) return b[2] - a[2];
      return b[1] - a[1];
    }
    return b[0] - a[0];
  });

  let answer = 0;
  let groupIdx = 0;

  for (let i = 0; i < picks.length; i++) {
    while (picks[i] > 0 && groupIdx < groupArr.length) {
      let [d, r, s] = groupArr[groupIdx];

      if (i === 0) answer += d * 1 + r * 1 + s * 1;
      else if (i === 1) answer += d * 5 + r * 1 + s * 1;
      else answer += d * 25 + r * 5 + s * 1;

      picks[i]--;
      groupIdx++; // 다음 그룹으로 이동
    }
  }

  return answer;
}
