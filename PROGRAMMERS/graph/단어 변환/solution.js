function solution(begin, target, words) {
  var answer = 0;

  let visited = new Set();
  let queue = [{ word: begin, depth: 0 }];
  while (queue.length) {
    const { word, depth } = queue.shift();
    if (word == target) return depth;

    for (const next of words) {
      if (!visited.has(next) && isConnected(next, word)) {
        visited.add(next);
        queue.push({ word: next, depth: depth + 1 });
      }
    }
  }

  return 0;
}

function isConnected(s1, s2) {
  let diff = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] != s2[i]) diff++;
    if (diff > 1) return false;
  }

  return diff == 1;
}
