function solution(board) {
  let max = board[0][0];

  for (let i = 1; i < board.length; i++) {
    for (let j = 1; j < board[0].length; j++) {
      if (board[i][j]) {
        board[i][j] =
          Math.min(board[i][j - 1], board[i - 1][j], board[i - 1][j - 1]) + 1;
      }
      max = Math.max(board[i][j], max);
    }
  }

  return max * max;
}
