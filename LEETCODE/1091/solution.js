/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  const N = grid.length;
  if (grid[0][0] === 1 || grid[N - 1][N - 1] === 1) return -1;

  const visited = Array.from({ length: N }, () => Array(N).fill(0));
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];

  let queue = [[0, 0, 1]]; // x, y, distance

  while (queue.length > 0) {
    let [x, y, distance] = queue.shift();
    if (x == N - 1 && y == N - 1) {
      return distance;
    }

    for (let dir of direction) {
      const [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited[nx][ny] &&
        grid[nx][ny] === 0
      ) {
        visited[nx][ny] = 1;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1;
};
