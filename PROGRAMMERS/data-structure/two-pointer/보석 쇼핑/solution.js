function solution(gems) {
  /*
    보석 쇼핑
    진열대의 특정 범위의 물건을 모두 싹쓸이 구매
    진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매
    모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아서 return
    return [시작 진열대 번호, 끝 진열대 번호]
    가장 짧은 구간이 여러개라면 시작 진열대 번호가 가장 작은 구간을 return

    end - start는 보석 개수만큼을 최소로 잡기
    일단 처음부터 끝가지 minlength로 돌다가 -> map 뺀거-1, 추가한거+1
    절대 안되면 minlength + 1 씩 가보기
    */

  //     let gemsSet = new Set(gems)
  //     let gemsCnt = gemsSet.size

  //     let gemsInitMap = new Map()

  //     let end = gemsCnt - 1
  //     // 처음에 보석 개수만큼 맵 돌리기
  //     for (let i = 0; i <= end; i++) {
  //         if (gemsInitMap.has(gems[i])) {
  //             gemsInitMap.set(gems[i], gemsInitMap.get(gems[i]) + 1)
  //         } else {
  //             gemsInitMap.set(gems[i], 1)
  //         }
  //     }

  //     let gemsMap = new Map(gemsInitMap)
  //     if (gemsMap.size === gemsCnt) return [1, end+1]

  //     while (end < gems.length) {
  //         if (end > gemsCnt - 1) {
  //             if (gemsInitMap.has(gems[end])) gemsInitMap.set(gems[end], gemsInitMap.get(gems[end]) + 1)
  //             else gemsInitMap.set(gems[end], 1)
  //         }

  //         gemsMap = new Map(gemsInitMap)

  //         for (let i = 0; i < gems.length - end; i++) {
  //             // [수정] 빼고 더하기 전에 현재 완성된 구간부터 정답인지 확인!
  //             if (gemsMap.size === gemsCnt) return [i + 1, i + end + 1]

  //             // 맨 앞에 나가는 거 하나 빼기
  //             if (gemsMap.get(gems[i]) === 1) gemsMap.delete(gems[i])
  //             else gemsMap.set(gems[i], gemsMap.get(gems[i]) - 1)

  //             // 맨 뒤에 새로 들어오는 거 하나 추가하기
  //             let nextGem = gems[i + end + 1]
  //             if (nextGem) {
  //                 if (gemsMap.has(nextGem)) gemsMap.set(nextGem, gemsMap.get(nextGem) + 1)
  //                 else gemsMap.set(nextGem, 1)
  //             }
  //         }

  //         end++
  //     }

  let gemsCnt = new Set(gems).size;
  let gemsMap = new Map();
  let answer = [1, gems.length]; // 가장 긴 구간으로 초기화

  let start = 0;
  let end = 0;

  while (end < gems.length) {
    // 오른쪽 포인터(end)를 이동하며 맵에 추가
    gemsMap.set(gems[end], (gemsMap.get(gems[end]) || 0) + 1);
    end++;

    // 모든 종류의 보석이 다 모였다면, 왼쪽(start)을 줄여보기
    while (gemsMap.size === gemsCnt) {
      // 현재 구간이 기존 정답보다 짧다면 갱신
      if (end - start < answer[1] - answer[0] + 1) {
        answer = [start + 1, end];
      }

      // 맨 앞 보석 빼기
      gemsMap.set(gems[start], gemsMap.get(gems[start]) - 1);
      if (gemsMap.get(gems[start]) === 0) {
        gemsMap.delete(gems[start]);
      }
      start++; // 왼쪽 포인터 전진
    }
  }

  return answer;
}
