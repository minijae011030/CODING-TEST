function solution(name) {
  let str = Array.from({ length: name.length }).fill("A");

  // 각 글자 알파벳 바꾸는 비용
  let change = 0;

  for (let i = 0; i < str.length; i++) {
    let cur = convertToAscii(str[i]);
    let target = convertToAscii(name[i]);

    change += calculate(cur, target);
  }

  // 좌우로 이동하는 비용
  let move = name.length - 1;

  for (let start = 0; start < name.length; start++) {
    let end = start + 1;
    let length = name.length;

    // 연속된 A 개수 확인
    while (end < length && name.charAt(end) === "A") {
      end++;
    }

    let case1 = move; // 시작부터 끝까지 쭉 가는경우
    let case2 = start * 2 + length - end; // 오른쪽으로 갔다가 꺾어서 한바퀴 도는 경우
    let case3 = (length - end) * 2 + start; // 뒤쪽부터 처리했다가 꺾어서 한바퀴 도는 경우

    move = Math.min(move, case2, case3);
  }

  return change + move;
}

function convertToAscii(char) {
  return char.charCodeAt();
}

function calculate(ascii1, ascii2) {
  const diff = Math.abs(ascii1 - ascii2);
  return Math.min(diff, 26 - diff);
}
