/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let p = head;
  let cnt = 0;

  while (p !== null) {
    p = p.next;
    cnt++;
  }

  if (n === cnt) {
    return head.next;
  }

  let q = head;
  for (let i = 0; i < cnt; i++) {
    if (i === cnt - n - 1) {
      q.next = q.next.next;
      break;
    }

    q = q.next;
  }

  return head;
};
