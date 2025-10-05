const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input[0]);

for (let i = 0; i < T; i++) {
  let p = input[3 * i + 1]; // 수행할 함수
  let n = Number(input[3 * i + 2]); // 배열에 들어있는 수의 개수
  let x = JSON.parse(input[3 * i + 3]);

  let isReversed = false;
  let isError = false;

  let head = 0,
    tail = x.length;

  for (let j = 0; j < p.length; j++) {
    if (p[j] === "R") {
      isReversed = !isReversed;
    } else {
      if (head >= tail) {
        isError = true;
        break;
      }
      if (isReversed) tail--;
      else head++;
    }
  }

  if (isError) {
    console.log("error");
    continue;
  }

  let res = x.slice(head, tail);
  if (isReversed) res.reverse();
  console.log("[" + res.join(",") + "]");
}

/**
 * R: 뒤집기 -> 배열에 잇는 수의 순서를 뒤집는 함수
 * D:버리기 -> 첫번째 수를 버리는 함수
 *      배열이 비어있는데 D 사용 시 에러
 *
 * 함수는 조합해서 한번에 사용 가능
 * AB -> A를 수행한 다음에 바로 B를 수행
 * ex) RDD -> 배열 뒤집고 처음 두 수 버리기
 */
