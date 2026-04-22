const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let map = [];

for (let i = 0; i < 9; i++) {
  map.push(input[i].split(" ").map(Number));
}

/**
 *
 * @param {number[][]} map
 */
function solution(map) {
  const zeros = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (map[r][c] === 0) zeros.push([r, c]);
    }
  }

  function isValid(row, col, num) {
    for (let i = 0; i < 9; i++) {
      // 가로, 세로 체크
      if (map[row][i] === num || map[i][col] === num) return false;

      // 3x3 박스 체크
      const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
      const boxCol = Math.floor(col / 3) * 3 + (i % 3);
      if (map[boxRow][boxCol] === num) return false;
    }
    return true;
  }

  function dfs(index) {
    if (index === zeros.length) {
      // 모든 빈칸을 채웠을 때 결과 출력 후 종료
      const result = map.map((row) => row.join(" ")).join("\n");
      console.log(result);
      process.exit(); // 정답을 하나만 찾으면 즉시 종료
    }

    const [r, c] = zeros[index];
    for (let i = 1; i <= 9; i++) {
      if (isValid(r, c, i)) {
        map[r][c] = i;
        dfs(index + 1);
        map[r][c] = 0;
      }
    }
  }

  dfs(0);
}

solution(map);
