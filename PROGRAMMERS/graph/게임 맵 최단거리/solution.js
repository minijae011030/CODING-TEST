function solution(maps) {
  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let [n, m] = [maps.length, maps[0].length];
  let visited = Array.from({ length: n }, () => Array(m).fill(0));

  let queue = [[0, 0, 1]];
  visited[0][0] = 1;
  let idx = 0;

  while (queue.length > idx) {
    let [x, y, cnt] = queue[idx++];
    if (x === n - 1 && y === m - 1) return cnt;

    for (let dir of direction) {
      let [dx, dy] = [x + dir[0], y + dir[1]];
      if (
        dx >= 0 &&
        dx < n &&
        dy >= 0 &&
        dy < m &&
        !visited[dx][dy] &&
        maps[dx][dy] === 1
      ) {
        visited[dx][dy] = 1;
        queue.push([dx, dy, cnt + 1]);
      }
    }
  }

  return -1;
}
