/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
  if (nums.length === 1) return nums[0];

  let result = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[j - 1]) sum += nums[j];

      if (nums[j] <= nums[j - 1] || j === nums.length - 1) {
        if (result < sum) result = sum;
        sum = 0;
        break;
      }
    }
  }

  return result;
};
