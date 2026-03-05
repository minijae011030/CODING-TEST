function solution(maps) {
  var answer = [];

  let ocean = [];
  maps.map((m) => ocean.push(m.split("")));
  let visited = Array.from({ length: ocean.length }, () =>
    Array(ocean[0].length).fill(0),
  );

  for (let i = 0; i < ocean.length; i++) {
    for (let j = 0; j < ocean[0].length; j++) {
      if (!visited[i][j] && ocean[i][j] !== "X") {
        visited[i][j] = 1;
        answer.push(bfs(ocean, visited, i, j));
      }
    }
  }

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

function bfs(ocean, visited, sx, sy) {
  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let answer = 0;
  let queue = [[sx, sy]];
  let idx = 0;

  while (idx < queue.length) {
    let [x, y] = queue[idx++];
    answer += Number(ocean[x][y]);

    for (let dir of direction) {
      let [dx, dy] = [x + dir[0], y + dir[1]];
      if (
        dx >= 0 &&
        dx < ocean.length &&
        dy >= 0 &&
        dy < ocean[0].length &&
        !visited[dx][dy] &&
        ocean[dx][dy] !== "X"
      ) {
        visited[dx][dy] = 1;
        queue.push([dx, dy]);
      }
    }
  }

  return answer;
}
