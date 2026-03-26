function solution(k, tangerine) {
  let answer = 0;

  const map = new Map();
  for (let i = 0; i < tangerine.length; i++) {
    map.set(tangerine[i], (map.get(tangerine[i]) ?? 0) + 1);
  }

  const sortedMap = [...map].sort(([a, aCnt], [b, bCnt]) => bCnt - aCnt);

  for (let [tangerine, cnt] of sortedMap) {
    answer++;
    if (k > cnt) k -= cnt;
    else break;
  }

  return answer;
}
