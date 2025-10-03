const solution = (board) => {
  const N = board.length;
  const visited = new Set(["0,0,0,1"]);

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rotation = [1, -1];

  function getNewPosition(x1, y1, x2, y2, dist) {
    let arr = [];

    // 일반 상하좌우 이동
    for (let dir of direction) {
      const [nx1, ny1] = [x1 + dir[0], y1 + dir[1]];
      const [nx2, ny2] = [x2 + dir[0], y2 + dir[1]];
      if (
        nx1 >= 0 &&
        ny1 >= 0 &&
        nx2 >= 0 &&
        ny2 >= 0 &&
        nx1 < N &&
        ny1 < N &&
        nx2 < N &&
        ny2 < N &&
        board[nx1][ny1] === 0 &&
        board[nx2][ny2] === 0
      ) {
        arr.push([nx1, ny1, nx2, ny2, dist + 1]);
      }
    }

    // 회전
    if (x1 === x2) {
      // 가로
      for (let rot of rotation) {
        if (
          x1 + rot >= 0 &&
          x1 + rot < N &&
          board[x1 + rot][y1] === 0 &&
          board[x2 + rot][y2] === 0
        ) {
          arr.push([x1, y1, x1 + rot, y1, dist + 1]); // 왼쪽축 기준 회전
          arr.push([x2, y2, x2 + rot, y2, dist + 1]); // 오른쪽축 기준 회전
        }
      }
    } else {
      // 세로
      for (let rot of rotation) {
        if (
          y1 + rot >= 0 &&
          y1 + rot < N &&
          board[x1][y1 + rot] === 0 &&
          board[x2][y2 + rot] === 0
        ) {
          arr.push([x1, y1, x1, y1 + rot, dist + 1]); // 위쪽축 기준 회전
          arr.push([x2, y2, x2, y2 + rot, dist + 1]); // 아래쪽축 기준 회전
        }
      }
    }

    return arr;
  }

  let queue = [];
  queue.push([0, 0, 0, 1, 0]); // x1, y1, x2, y2, dist;

  while (queue.length > 0) {
    const [x1, y1, x2, y2, dist] = queue.shift();

    if ((x1 == N - 1 && y1 == N - 1) || (x2 == N - 1 && y2 == N - 1))
      return dist;

    const newPosition = getNewPosition(x1, y1, x2, y2, dist);

    for (let newPos of newPosition) {
      let [x1, y1, x2, y2, dist] = newPos;

      if (x1 > x2 || y1 > y2) [x1, y1, x2, y2] = [x2, y2, x1, y1];

      const coordinate = x1 + "," + y1 + "," + x2 + "," + y2;

      if (!visited.has(coordinate)) {
        visited.add(coordinate);
        queue.push(newPos);
      }
    }
  }

  return -1;
};
