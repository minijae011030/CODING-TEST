/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (s.length === 1 || numRows >= s.length || numRows === 1) {
    return s;
  }

  let rows = Array.from({ length: numRows }, () => "");
  let currentRow = 0;
  let goingDown = false;

  for (const char of s) {
    rows[currentRow] += char;

    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    if (goingDown) currentRow += 1;
    else currentRow -= 1;
  }

  return rows.join("");
};
