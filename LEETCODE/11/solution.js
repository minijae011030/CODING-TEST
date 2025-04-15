/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let start = 0;
  let end = height.length - 1;

  let max = 0;
  while (end - start > 0) {
    let yAxis = height[start] > height[end] ? height[end] : height[start];
    let xAxis = end - start;

    let vol = yAxis * xAxis;
    if (max < vol) {
      max = vol;
    }

    height[end] > height[start] ? start++ : end--;
  }

  return max;
};
