function solution(n, wires) {
  var answer = n;

  // 인접리스트 형태의 그래프 생성
  let tree = Array.from(Array(n + 1), () => []);
  wires.forEach((element) => {
    let [a, b] = element;

    tree[a].push(b);
    tree[b].push(a);
  });

  function treeSearch(root, exceptNum) {
    let count = 0;
    let visit = Array(n + 1).fill(false);
    let queue = [root];
    visit[root] = true;

    while (queue.length) {
      let index = queue.pop();
      tree[index].forEach((element) => {
        if (element != exceptNum && !visit[element]) {
          visit[element] = true;
          queue.push(element);
        }
      });
      count++;
    }

    return count;
  }

  wires.forEach((element) => {
    let [a, b] = element;

    // treeSearch(a, b)는 a 노드를 기준으로 b를 제외한 서브 트리의 송전탑 개수를 구함
    // treeSearch(b, a)는 반대로 b 노드를 기준으로 a를 제외한 서브 트리의 송전탑 개수를 구함
    answer = Math.min(answer, Math.abs(treeSearch(a, b) - treeSearch(b, a)));
  });

  return answer;
}
