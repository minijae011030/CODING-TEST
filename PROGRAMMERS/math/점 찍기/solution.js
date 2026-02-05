function solution(k, d) {
  /*
    거리^2 >= x^2 + y^2
    y^2 <= 거리^2 - x^2
    
    y의 최대는 거리^2 - x^2
    */
  let cnt = 0;

  for (let x = 0; x <= d; x += k) {
    cnt += Math.floor(Math.sqrt(d ** 2 - x ** 2) / k) + 1;
  }

  return cnt;
}
