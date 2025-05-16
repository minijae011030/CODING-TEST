/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  let max = 0;
  DFS(root, 1);

  function DFS(root, depth) {
    if (!root.left && !root.right) {
      max = Math.max(max, depth);
      return;
    }

    if (root.left) DFS(root.left, depth + 1);
    if (root.right) DFS(root.right, depth + 1);
  }

  return max;
};
