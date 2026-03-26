function solution(arr) {
  // 작게 나오는 법칙을 찾아라?
  // 빼기를 잘 보고.... 빼는 숫자가 작아져야함
  // - 뒤에 숫자가 작아지도록???
  // 근데 어케 dp로?
  // 빼기 뒤에 보고 가장 작아질수있는거 찾기!!! 이거당
  // 가장 마지막에 나오는 빼기 뒤에부터 봐서 작게 만들기? -> 이거는 아님!
  // 괄호를 어디까지 치느냐가 핵쉼....
  // - 뒤의 구간에서 최소 / + 뒤의 구간에서 최대를 찾아라

  let numberLen = Math.ceil(arr.length / 2);
  // max[i][j] = i~j 구간 사칙연산 최댓값
  let max = Array.from({ length: numberLen }, () =>
    Array(numberLen).fill(-Infinity),
  );
  // min[i][j] = i~j 구간 사칙연산 최솟값
  let min = Array.from({ length: numberLen }, () =>
    Array(numberLen).fill(Infinity),
  );

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "+" && arr[i] !== "-") arr[i] = Number(arr[i]);
  }

  for (let i = 0; i < arr.length; i += 2) {
    for (let j = 0; j < arr.length; j += 2) {
      if (i === j) {
        min[i / 2][j / 2] = arr[i];
        max[i / 2][j / 2] = arr[i];
      }
    }
  }

  for (let dist = 1; dist < numberLen; dist++) {
    // i = 시작점, j = 끝점
    for (let i = 0; i < min[0].length - dist; i++) {
      let j = i + dist;

      for (let k = i; k < j; k++) {
        let operatorIndex = k * 2 + 1; // arr에서 연산자의 실제 위치
        let op = arr[operatorIndex];

        if (op === "+") {
          max[i][j] = Math.max(max[i][j], max[i][k] + max[k + 1][j]);
          min[i][j] = Math.min(min[i][j], min[i][k] + min[k + 1][j]);
        }
        if (op === "-") {
          max[i][j] = Math.max(max[i][j], max[i][k] - min[k + 1][j]);
          min[i][j] = Math.min(min[i][j], min[i][k] - max[k + 1][j]);
        }
      }
    }
  }

  return max[0][numberLen - 1];
}
