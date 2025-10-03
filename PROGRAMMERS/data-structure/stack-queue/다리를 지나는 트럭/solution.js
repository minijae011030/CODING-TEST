function solution(bridge_length, weight, truck_weights) {
  let waiting_queue = [];
  let bridge_queue = [];

  let time = 0;

  for (truck of truck_weights) {
    waiting_queue.push([truck, 0]);
  }

  bridge_queue.push(waiting_queue.shift());

  while (waiting_queue.length > 0 || bridge_queue.length > 0) {
    time++;
    bridge_queue.forEach((truck) => (truck[1] += 1));

    if (bridge_queue[0][1] == bridge_length) bridge_queue.shift();
    const cur_weight = bridge_queue.reduce((acc, cur) => acc + cur[0], 0);
    if (
      waiting_queue.length > 0 &&
      cur_weight + waiting_queue[0][0] <= weight
    ) {
      bridge_queue.push(waiting_queue.shift());
    }
  }

  return time + 1;
}
