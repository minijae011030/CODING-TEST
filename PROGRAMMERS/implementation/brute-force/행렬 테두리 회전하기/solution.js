function solution(rows, columns, queries) {
  let map = Array.from({ length: rows + 1 }, () => Array(columns + 1).fill(0));
  let n = 1;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      map[i][j] = n++;
    }
  }

  var answer = [];

  queries.forEach(([x1, y1, x2, y2]) => {
    let tmp = [];
    for (let i = y1; i < y2; i++) tmp.push(map[x1][i]);
    for (let i = x1; i < x2; i++) tmp.push(map[i][y2]);
    for (let i = y2; i > y1; i--) tmp.push(map[x2][i]);
    for (let i = x2; i > x1; i--) tmp.push(map[i][y1]);

    let rot = tmp.pop();
    tmp.unshift(rot);

    answer.push(Math.min(...tmp));

    for (let i = y1; i < y2; i++) map[x1][i] = tmp.shift();
    for (let i = x1; i < x2; i++) map[i][y2] = tmp.shift();
    for (let i = y2; i > y1; i--) map[x2][i] = tmp.shift();
    for (let i = x2; i > x1; i--) map[i][y1] = tmp.shift();
  });

  return answer;
}
