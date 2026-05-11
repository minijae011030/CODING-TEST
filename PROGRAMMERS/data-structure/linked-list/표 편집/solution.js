class ListNode {
  constructor(data) {
    this.isDeleted = false;
    this.row = data;
    this.next = null;
    this.prev = null;
  }
}

function solution(n, k, cmd) {
  /*
    표 편집
    명령어 기반 표 행 선택, 삭제, 복구
    
    한 번에 한 행만 선택, 표 범위 벗어날 수 없음
    U x: 현재 선택된 행에서 x칸 위에 있는 행 선택
    D x: 현재 선택된 행에서 x칸 아래에 있는 행 선택
    C: 현재 선택된 행을 삭제 후 바로 아래 행 선택, 단 맨 아래행 삭제 시 바로 윗 행 선택
    Z: 가장 최근 삭제된 행 복구, 단 현재 선택된 행은 바뀌지 않음
    
    최종 표의 상태와 처음 주어진 표의 상태를 비교해 삭제되지 않은 행은 O, 삭제된 행은 X로 표시
    문자열 형태로 리턴
    */

  let head = new ListNode(0);
  let curr = head;
  let selectedNode = null;

  if (k === 0) selectedNode = head;

  let nodes = [head];
  for (let i = 1; i < n; i++) {
    let newNode = new ListNode(i);
    curr.next = newNode;
    newNode.prev = curr;
    curr = newNode;
    if (i === k) selectedNode = newNode;
    nodes.push(newNode);
  }

  let deleted = [];

  for (let c of cmd) {
    let [curCmd, cnt] = c.split(" ");

    if (curCmd === "U") {
      // U x: 현재 선택된 행에서 x칸 위에 있는 행 선택
      for (let i = 0; i < cnt; i++) {
        selectedNode = selectedNode.prev;
      }
    } else if (curCmd === "D") {
      // D x: 현재 선택된 행에서 x칸 아래에 있는 행 선택
      for (let i = 0; i < cnt; i++) {
        selectedNode = selectedNode.next;
      }
    } else if (curCmd === "C") {
      // C: 현재 선택된 행을 삭제 후 바로 아래 행 선택, 단 맨 아래행 삭제 시 바로 윗 행 선택

      deleted.push(selectedNode); // 삭제할 노드 스택 저장
      selectedNode.isDeleted = true; // 삭제될 노드 상태 변경

      let prev = selectedNode.prev;
      let next = selectedNode.next;

      // 연결 끊기
      if (prev) prev.next = next;
      if (next) next.prev = prev;

      // 다음 노드 선택
      selectedNode = next ? next : prev;
    } else if (curCmd === "Z") {
      // Z: 가장 최근 삭제된 행 복구, 단 현재 선택된 행은 바뀌지 않음

      let restoreNode = deleted.pop(); // 가장 최근에 삭제된 노드를 꺼냄

      let prev = restoreNode.prev;
      let next = restoreNode.next;

      if (prev) prev.next = restoreNode; // 내 이전 노드가 있다면, 그 노드의 next를 다시 나로 설정
      if (next) next.prev = restoreNode; // 내 다음 노드가 있다면, 그 노드의 prev를 다시 나로 설정

      restoreNode.isDeleted = false;
    }
  }

  return nodes.map((node) => (node.isDeleted ? "X" : "O")).join("");
}
