function solution(new_id) {
  // 1. 대문자 -> 소문자
  let step1 = new_id.toLowerCase().split("");

  // 2. 특수문자 제외
  let step2 = [];
  step1.forEach((string) => {
    if (
      (string >= "0" && string <= "9") ||
      (string >= "a" && string <= "z") ||
      string === "-" ||
      string === "_" ||
      string === "."
    ) {
      step2.push(string);
    }
  });

  // 3. 마침표 2번 이상을 하나의 마침표로 치환
  let step3 = [];
  let dotStack = [];
  step2.forEach((char) => {
    if (char === ".") {
      if (dotStack.length === 0) {
        step3.push(".");
        dotStack.push(".");
      }
    } else {
      step3.push(char);
      dotStack = [];
    }
  });

  // 4. 처음이나 끝에 마침표 위치시 제거
  let startIdx = step3[0] == "." ? 1 : 0;
  let endIdx =
    step3[step3.length - 1] == "." ? step3.length - 2 : step3.length - 1;

  let step4 = step3.slice(startIdx, endIdx + 1);

  // 5. 빈문자열이면 a 대입
  let step5 = step4.join("");
  if (step5 === "") step5 = "a";

  // 6. 16자 이상이면 15자 뒤에 제거, 자르고 뒤에 .이 있다면 제거
  if (step5.length >= 16) step5 = step5.slice(0, 15);

  endIdx = step5[step5.length - 1] == "." ? step5.length - 2 : step5.length - 1;

  let step6 = step5.slice(0, endIdx + 1);

  // 7. 2자 이하이면 길이가 3이 될때까지 마지막 문자 붙이기
  let step7 = step6;

  if (step7.length <= 2) {
    const lastChar = step6.charAt(step6.length - 1);
    while (step7.length < 3) {
      step7 += lastChar;
    }
  }

  return step7;
}

//  만재씨 공부 열심히 하세요~!!!
