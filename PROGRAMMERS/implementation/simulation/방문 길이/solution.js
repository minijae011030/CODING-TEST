function solution(dirs) {
  let visited = new Set();

  let x = 0;
  let y = 0;

  for (let dir of dirs) {
    let nx = x;
    let ny = y;

    if (dir === "U") ny--;
    if (dir === "D") ny++;
    if (dir === "L") nx--;
    if (dir === "R") nx++;

    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) continue;

    let way = [x, y, nx, ny];
    if (dir === "D" || dir === "L") way = [nx, ny, x, y];

    visited.add(way.join(""));

    x = nx;
    y = ny;
  }

  return visited.size;
}
