function solution(maps) {
  var answer = 0;

  let mapsArr = [];
  for (let i = 0; i < maps.length; i++) {
    mapsArr.push(maps[i].split(""));
  }

  const [N, M] = [mapsArr.length, mapsArr[0].length];

  let s_idx, e_idx, l_idx;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (mapsArr[i][j] === "S") s_idx = [i, j];
      if (mapsArr[i][j] === "E") e_idx = [i, j];
      if (mapsArr[i][j] === "L") l_idx = [i, j];
    }
  }

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // 출발점에서 레버로 가는 최소 시간
  let visited1 = Array.from({ length: N }, () => Array(M).fill(0));
  let queue1 = [[s_idx[0], s_idx[1], 0]]; // x, y, distance
  visited1[s_idx[0]][s_idx[1]] = 1;

  while (queue1.length > 0) {
    let [x, y, distance] = queue1.shift();
    if (x == l_idx[0] && y == l_idx[1]) {
      answer += distance;
      break;
    }

    for (let dir of direction) {
      let [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        !visited1[nx][ny] &&
        mapsArr[nx][ny] != "X"
      ) {
        visited1[nx][ny] = 1;
        queue1.push([nx, ny, distance + 1]);
      }
    }
  }

  if (answer == 0) return -1;

  // 레버에서 출구로 가는 최소 시간
  let visited2 = Array.from({ length: N }, () => Array(M).fill(0));
  let queue2 = [[l_idx[0], l_idx[1], 0]]; // x, y, distance
  visited2[l_idx[0]][l_idx[1]] = 1;

  while (queue2.length > 0) {
    let [x, y, distance] = queue2.shift();
    if (x == e_idx[0] && y == e_idx[1]) {
      answer += distance;
      return answer;
    }

    for (let dir of direction) {
      let [nx, ny] = [x + dir[0], y + dir[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        !visited2[nx][ny] &&
        mapsArr[nx][ny] != "X"
      ) {
        visited2[nx][ny] = 1;
        queue2.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1;
}
