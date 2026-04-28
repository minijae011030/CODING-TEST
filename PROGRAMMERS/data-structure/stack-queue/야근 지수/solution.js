function solution(n, works) {
  /*
    야근 지수
    야근을 하면 야근 피로도가 쌓임
    야근 피로도: 야근을 시작한 시점 -> (남은 일의 작업량)^2
    N 시간동안 야근 피로도 최소화
    1시간 동안 작업량 1만큼 처리
    퇴근시간까지 남은 N시간과 각 일에 대한 작업량 works에 대해 야근 피로도를 최소화한 값을 리턴
    */
  /*
    시간초과
    
    works.sort((a, b) => b - a)
    while (n > 0) {
        n--
        works[0]--
        works.sort((a, b) => b - a)
    }
    
    let answer = 0
    
    for (let i = 0; i < works.length; i++) {
        if (works[i] < 0) {
            continue;
        }
        
        answer += works[i]*works[i]
    }
    
    return answer
    */

  let max = Math.max(...works);
  let arr = Array(max + 1).fill(0);
  for (let work of works) {
    arr[work]++;
  }

  for (let i = arr.length - 1; i > 0; i--) {
    let min = Math.min(n, arr[i]);
    arr[i] -= min;
    arr[i - 1] += min;
    n -= min;
  }

  let answer = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > 0) answer += i ** 2 * arr[i];
  }

  return answer;
}
