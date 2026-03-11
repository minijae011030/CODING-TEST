function solution(x, y, n) {
  let queue = [[y, 0]];
  let idx = 0;

  while (idx < queue.length) {
    let [cur, cnt] = queue[idx++];

    if (cur === x) return cnt;

    if (cur / 2 >= x && Math.floor(cur / 2) === cur / 2)
      queue.push([cur / 2, cnt + 1]);
    if (cur / 3 >= x && Math.floor(cur / 3) === cur / 3)
      queue.push([cur / 3, cnt + 1]);
    if (cur - n >= x) queue.push([cur - n, cnt + 1]);
  }

  return -1;
}
