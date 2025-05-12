function solution(city) {
  let [N, M] = [city.length, city[0].length];
  let visited = Array.from({ length: N }, () => Array(M).fill(0));
  let queue = [[0, 0, 1]]; // x, y, dist

  if (city[0][0] === 1) return -1;
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
  ];

  while (queue.length > 0) {
    let [x, y, dist] = queue.shift();
    if (x === N - 1 && y === M - 1) {
      return dist;
    }

    for (dir of direction) {
      const [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        !visited[nx][ny] &&
        city[nx][ny] === 0
      ) {
        visited[nx][ny] = 1;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return -1;
}
