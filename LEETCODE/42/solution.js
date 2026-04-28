/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let max = 0;
  let maxIdx = 0;

  for (let i = 0; i < height.length; i++) {
    if (height[i] > max) {
      max = height[i];
      maxIdx = i;
    }
  }

  let answer = 0;

  let leftMaxHeight = 0;
  let rightMaxHeight = 0;

  for (let i = 0; i < maxIdx; i++) {
    if (height[i] > leftMaxHeight) {
      leftMaxHeight = height[i];
    } else {
      answer += leftMaxHeight - height[i];
    }
  }

  for (let i = height.length - 1; i > maxIdx; i--) {
    if (height[i] > rightMaxHeight) {
      rightMaxHeight = height[i];
    } else {
      answer += rightMaxHeight - height[i];
    }
  }

  return answer;
};
