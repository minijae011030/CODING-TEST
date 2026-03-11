function solution(n, costs) {
  let answer = 0;

  let parent = [];
  for (let i = 0; i < n; i++) parent.push(i);

  costs.sort((a, b) => a[2] - b[2]);

  for (let cost of costs) {
    if (findParent(parent, cost[0], cost[1])) continue;
    answer += cost[2];
    unionParent(parent, cost[0], cost[1]);
  }

  return answer;
}

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

function unionParent(parent, a, b) {
  let n1 = getParent(parent, a);
  let n2 = getParent(parent, b);

  if (n1 < n2) return (parent[n2] = n1);
  return (parent[n1] = n2);
}

function findParent(parent, a, b) {
  let n1 = getParent(parent, a);
  let n2 = getParent(parent, b);

  if (n1 === n2) return true;
  return false;
}
