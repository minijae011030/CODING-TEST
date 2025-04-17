function solution(priorities, location) {
  let prioritiesQueue = [];
  for (let i = 0; i < priorities.length; i++) {
    prioritiesQueue.push([priorities[i], i]);
  }

  let order = 1;
  while (prioritiesQueue.length > 0) {
    const p = prioritiesQueue.shift();
    let higherPriority = prioritiesQueue.filter(
      (q) => p[0] < q[0] && p[1] != q[1]
    );
    if (higherPriority.length >= 1) {
      prioritiesQueue.push(p);
    } else {
      if (p[1] == location) {
        return order;
      }
      order++;
    }
  }
}
