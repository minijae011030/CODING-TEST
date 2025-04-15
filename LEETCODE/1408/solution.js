/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  return words.filter((word) =>
    words.some((otherWord) => otherWord !== word && otherWord.includes(word))
  );
};
