/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  let n = rooms.length;
  let visited = Array(n).fill(0);

  DFS(0);

  function DFS(idx) {
    visited[idx] = 1;
    for (let i = 0; i < rooms[idx].length; i++) {
      let nextNode = rooms[idx][i];
      if (!visited[nextNode]) {
        DFS(nextNode);
      }
    }
  }

  return visited.reduce((cur, acc) => (acc += cur), 0) === rooms.length;
};
