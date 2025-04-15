/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits === "") return [];

  let phoneLetterArray = [
    [],
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
    ["j", "k", "l"],
    ["m", "n", "o"],
    ["p", "q", "r", "s"],
    ["t", "u", "v"],
    ["w", "x", "y", "z"],
  ];

  let digit = digits.split("");
  for (let i = 0; i < digit.length; i++) {
    digit[i] = parseInt(digit[i]) - 1;
  }

  const result = [];
  function DFS(path, arrays, index) {
    if (index === arrays.length) {
      result.push(path);
      return;
    }

    for (let letter of arrays[index]) {
      DFS(path + letter, arrays, index + 1);
    }
  }

  function getCombinationsByIndexes(indexes) {
    const selectedArrays = indexes.map((index) => phoneLetterArray[index]);
    DFS("", selectedArrays, 0);
    return result;
  }

  return getCombinationsByIndexes(digit);
};
