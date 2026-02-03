function solution(triangle) {
  // 삼각형 아래에서부터 맨 위로 올라가기
  // 각 칸에 도달했을때 가장 합이 큰 값을 구하기

  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] =
        Math.max(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
    }
  }

  return triangle[0][0];
}
