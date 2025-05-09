function solution(n, m, hole) {
  let mapArr = Array.from({ length: n }, () => Array(m).fill(0));
  for ([x, y] of hole) mapArr[x - 1][y - 1] = 1;

  // visited[x][y][0]: 신발 안 쓴 상태에서 방문
  // visited[x][y][1]: 신발 쓴 상태에서 방문
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => [false, false])
  );

  let queue = [[0, 0, 0, 0]]; // x, y, distance, used
  visited[0][0][0] = true;

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    let [x, y, distance, used] = queue.shift();
    if (x == n - 1 && y == m - 1) return distance;

    for (let dir of direction) {
      let [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        !visited[nx][ny][used] &&
        mapArr[nx][ny] !== 1
      ) {
        visited[nx][ny][used] = 1;
        queue.push([nx, ny, distance + 1, used]);
      }
    }

    // 신발 신고 뛰기
    if (used === 0) {
      for (let dir of direction) {
        let [nx, ny] = [x + dir[0] * 2, y + dir[1] * 2];
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < n &&
          ny < m &&
          !visited[nx][ny][used] &&
          mapArr[nx][ny] === 0
        ) {
          visited[nx][ny][1] = true;
          queue.push([nx, ny, distance + 1, 1]);
        }
      }
    }
  }

  return -1;
}
