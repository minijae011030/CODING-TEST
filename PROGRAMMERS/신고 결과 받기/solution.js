function solution(id_list, report, k) {
  var answer = Array.from({ length: id_list.length }).fill(0);
  let dec = Array.from({ length: id_list.length }).fill(0);

  // report 중복 제거
  report = new Set(report);
  report = [...report];

  // 신고당한 사람 횟수 저장
  report.forEach((name) => {
    let [a, b] = name.split(" ");
    dec[id_list.indexOf(b)] += 1;
  });

  // dec에 따라 신고자에게 메일 발송
  report.forEach((name) => {
    let [a, b] = name.split(" ");
    if (dec[id_list.indexOf(b)] >= k) answer[id_list.indexOf(a)] += 1;
  });

  return answer;
}
