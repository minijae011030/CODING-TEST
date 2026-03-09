function solution(bridge_length, weight, truck_weights) {
  let cur_weight = 0;

  let time = 0;
  let bridge = Array.from({ length: bridge_length }).fill(0);

  while (truck_weights.length > 0 || cur_weight > 0) {
    time++;
    cur_weight -= bridge.shift();

    if (truck_weights.length > 0) {
      if (truck_weights[0] + cur_weight <= weight) {
        let truck = truck_weights.shift();
        cur_weight += truck;
        bridge.push(truck);
      } else {
        bridge.push(0);
      }
    }
  }

  return time;
}
