/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  let result = [];

  function DFS(array, index, currentSum) {
    if (array.length === 4) {
      if (currentSum === target) {
        result.push([...array]);
      }
      return;
    }

    for (let i = index; i < nums.length; i++) {
      // 중복 제거
      if (i > index && nums[i] === nums[i - 1]) continue;

      // 가지치기 조건 1: 남은 숫자를 모두 더해도 target에 도달할 수 없는 경우
      if (currentSum + nums[i] + (3 - array.length) * nums[i] > target) break;

      // 가지치기 조건 2: 현재 합과 남은 최대값으로도 target에 못 미치는 경우
      if (
        currentSum + nums[i] + (3 - array.length) * nums[nums.length - 1] <
        target
      )
        continue;

      array.push(nums[i]);
      DFS(array, i + 1, currentSum + nums[i]);
      array.pop();
    }
  }

  DFS([], 0, 0);

  return result;
};
