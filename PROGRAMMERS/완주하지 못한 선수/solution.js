function solution(participant, completion) {
  let participantMap = new Map();

  for (p of participant) {
    participantMap.set(p, (participantMap.get(p) || 0) + 1);
  }

  for (c of completion) {
    participantMap.set(c, participantMap.get(c) - 1);
  }

  for (const [name, cnt] of participantMap) {
    if (cnt == 1) {
      return name;
    }
  }
}
