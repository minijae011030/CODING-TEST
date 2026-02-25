function solution(m, n, board) {
  var answer = 0;
  for (let i = 0; i < board.length; i++) {
    board[i] = board[i].split("");
  }

  while (1) {
    let find = [];
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (findBlock(board, i, j, m, n)) find.push([i, j]);
      }
    }

    if (find.length === 0) break;

    answer += removeBlock(board, find, m, n);
  }

  return answer;
}

function findBlock(board, x, y, m, n) {
  let target = board[x][y];
  if (target === -1) return false;

  if (board[x + 1][y] !== target) return false;
  if (board[x][y + 1] !== target) return false;
  if (board[x + 1][y + 1] !== target) return false;

  return true;
}

function removeBlock(board, find, m, n) {
  let cnt = 0;
  find.map(([x, y]) => {
    if (board[x][y] !== -1) {
      cnt++;
      board[x][y] = -1;
    }
    if (board[x + 1][y] !== -1) {
      cnt++;
      board[x + 1][y] = -1;
    }
    if (board[x][y + 1] !== -1) {
      cnt++;
      board[x][y + 1] = -1;
    }
    if (board[x + 1][y + 1] !== -1) {
      cnt++;
      board[x + 1][y + 1] = -1;
    }
  });

  for (let i = 0; i < n; i++) {
    for (let j = m - 1; j >= 1; j--) {
      if (board[j][i] === -1) {
        for (let k = j - 1; k >= 0; k--) {
          if (board[k][i] !== -1) {
            board[j][i] = board[k][i];
            board[k][i] = -1;
            break;
          }
        }
      }
    }
  }

  return cnt;
}
