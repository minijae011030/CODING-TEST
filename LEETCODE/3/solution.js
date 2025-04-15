/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0; // 가장 긴 부분 문자열의 길이
  let start = 0; // 슬라이딩 윈도우 시작점
  let charSet = new Set(); // 현재 윈도우의 문자 집합

  for (let end = 0; end < s.length; end++) {
    // 중복 문자가 있을 경우, 윈도우의 시작점을 이동시켜 중복 문자 제거
    while (charSet.has(s[end])) {
      charSet.delete(s[start]);
      start++;
    }

    charSet.add(s[end]); // 현재 문자를 윈도우에 추가
    maxLength = Math.max(maxLength, end - start + 1); // 가장 긴 길이 갱신
  }

  return maxLength;
};
