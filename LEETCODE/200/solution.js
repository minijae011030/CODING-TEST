/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const [M, N] = [grid.length, grid[0].length];
  let visited = Array.from({ length: M }, () => Array(N).fill(0));

  let cnt = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && grid[i][j] === "1") {
        cnt++;
        DFS(i, j);
      }
    }
  }

  function DFS(x, y) {
    const direction = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    visited[x][y] = 1;
    for (dir of direction) {
      const [nx, ny] = [dir[0] + x, dir[1] + y];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < M &&
        ny < N &&
        !visited[nx][ny] &&
        grid[nx][ny] === "1"
      ) {
        DFS(nx, ny);
      }
    }
  }

  return cnt;
};
