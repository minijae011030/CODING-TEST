function solution(people, limit) {
  let answer = 0;
  people.sort((a, b) => b - a);

  let end = people.length - 1;
  for (let i = 0; i <= end; i++) {
    answer++;
    if (people[i] + people[end] <= limit) {
      end--;
    }
  }

  return answer;
}
