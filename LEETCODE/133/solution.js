/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node, cp = new Map()) {
  if (!node) return null;

  if (!cp.has(node)) {
    cp.set(node, new _Node(node.val, []));
    cp.get(node).neighbors = node.neighbors.map((neighbor) =>
      cloneGraph(neighbor, cp),
    );
  }

  return cp.get(node);
};
