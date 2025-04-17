function solution(clothes) {
  var answer = 1;

  let ClothesMap = new Map();

  for (const [_, type] of clothes) {
    ClothesMap.set(type, (ClothesMap.get(type) || 0) + 1);
  }

  for (let num of ClothesMap.values()) {
    answer *= num + 1;
  }

  return answer - 1;
}
