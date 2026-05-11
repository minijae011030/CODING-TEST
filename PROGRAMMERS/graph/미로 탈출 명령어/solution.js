function solution(n, m, x, y, r, c, k) {
  /*
    미로 탈출 명령어
    격자의 크기 n, m
    출발 위치 x, y
    탈출 지점 r, c
    탈출까지 이동해야하는 거리 k
    */

  let map = Array.from({ length: n }, () => Array(m).fill("."));
  map[x - 1][y - 1] = "S";
  map[r - 1][c - 1] = "E";

  const direction = [
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
    [-1, 0, "u"],
  ];

  let min = getDist(x, y, r, c);

  if (min > k || (k - min) % 2 !== 0) return "impossible";

  let answer = "";
  let found = false;

  function dfs(cx, cy, path, rk) {
    if (found) return;

    const dist = getDist(cx, cy, r, c);
    if (dist > rk) return;

    if (rk === 0) {
      if (cx === r && cy === c) {
        answer = path;
        found = true;
      }
      return;
    }

    for (let [dx, dy, dir] of direction) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx >= 1 && nx <= n && ny >= 1 && ny <= m) {
        dfs(nx, ny, path + dir, rk - 1);
      }
    }
  }

  dfs(x, y, "", k);
  return found ? answer : "impossible";
}

function getDist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
