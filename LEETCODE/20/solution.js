/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let arr = s.split("");
  let stack = [];

  let idx = 0;
  while (arr.length > idx) {
    if (arr[idx] === "(" || arr[idx] === "{" || arr[idx] === "[")
      stack.push(arr[idx]);
    else {
      let s = stack.pop();
      if (
        (arr[idx] === ")" && s !== "(") ||
        (arr[idx] === "}" && s !== "{") ||
        (arr[idx] === "]" && s !== "[")
      ) {
        return false;
      }
    }
    idx++;
  }

  return stack.length == 0;
};
