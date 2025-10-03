function solution(places) {
  var answer = [];

  for (let place of places) {
    let placeArr = [];
    for (let i = 0; i < place.length; i++) {
      placeArr.push(place[i].split(""));
    }

    let person = [];
    for (let i = 0; i < placeArr.length; i++) {
      for (let j = 0; j < placeArr[i].length; j++) {
        if (placeArr[i][j] === "P") person.push([i, j]);
      }
    }

    let isOk = true;
    for (let i = 0; i < person.length; i++) {
      for (let j = i + 1; j < person.length; j++) {
        if (getManDis(person[i], person[j]) > 2) continue;
        if (!isSafe(person[i], person[j], placeArr)) {
          isOk = false;
          break;
        }
      }
      if (!isOk) break;
    }

    answer.push(isOk ? 1 : 0);
  }

  return answer;
}

function getManDis(pos1, pos2) {
  // pos1: [x1, y1], pos2: [x2, y2]
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}

function isSafe(pos1, pos2, placeArr) {
  const [x1, y1] = pos1;
  const [x2, y2] = pos2;
  const dist = getManDis(pos1, pos2);

  if (dist === 1) return false;

  if (dist === 2) {
    // 같은 행
    if (x1 === x2) {
      const midY = (y1 + y2) / 2;
      if (placeArr[x1][midY] !== "X") return false;
    }
    // 같은 열
    else if (y1 === y2) {
      const midX = (x1 + x2) / 2;
      if (placeArr[midX][y1] !== "X") return false;
    }
    // 대각선
    else {
      if (!(placeArr[x1][y2] === "X" && placeArr[x2][y1] === "X")) return false;
    }
  }

  return true;
}
