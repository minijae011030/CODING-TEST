function solution(nums) {
  let n = nums.length / 2;

  let monsterMap = new Map();

  for (monster of nums) {
    monsterMap.set(monster, (monsterMap.get(monster) || 0) + 1);
  }

  if (monsterMap.size >= n) {
    return n;
  }

  return monsterMap.size;
}
