function solution(folders, p, q) {
  const tree = {};
  const parent = {};
  const depth = {};

  for (let folder of folders) {
    let [from, to] = folder;
    if (!tree[from]) tree[from] = [];
    tree[from].push(to);
    parent[to] = from;
  }

  function DFS(node, d) {
    depth[node] = d;
    if (!tree[node]) return;
    for (let next of tree[node]) {
      DFS(next, d + 1);
    }
  }

  DFS("root", 0);

  function LCA(a, b) {
    while (depth[a] > depth[b]) a = parent[a];
    while (depth[b] > depth[a]) b = parent[b];
    while (a !== b) {
      a = parent[a];
      b = parent[b];
    }

    return a;
  }

  return LCA(p, q);
}
