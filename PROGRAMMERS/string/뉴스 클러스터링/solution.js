function solution(str1, str2) {
  let str1Set = [];
  for (let i = 0; i < str1.length - 1; i++) {
    let newStr1 = str1.slice(i, i + 2).toUpperCase();
    if (
      newStr1[0] >= "A" &&
      newStr1[0] <= "Z" &&
      newStr1[1] >= "A" &&
      newStr1[1] <= "Z"
    ) {
      str1Set.push(newStr1);
    }
  }

  let str2Set = [];
  for (let i = 0; i < str2.length - 1; i++) {
    let newStr2 = str2.slice(i, i + 2).toUpperCase();
    if (
      newStr2[0] >= "A" &&
      newStr2[0] <= "Z" &&
      newStr2[1] >= "A" &&
      newStr2[1] <= "Z"
    ) {
      str2Set.push(newStr2);
    }
  }

  let unionSet = union(str1Set, str2Set);
  let intersectionSet = intersection(str1Set, str2Set);

  if (unionSet.length === 0 && intersectionSet.length === 0) return 65536;
  return Math.floor((intersectionSet.length / unionSet.length) * 65536);
}

function union(str1Set, str2Set) {
  let copiedStr1Set = [...str1Set];
  let copiedStr2Set = [...str2Set];

  let unionSet = [];

  for (let i = 0; i < copiedStr1Set.length; i++) {
    let idx = copiedStr2Set.indexOf(copiedStr1Set[i]);
    if (idx !== -1) copiedStr2Set.splice(idx, 1);
  }

  unionSet = [...copiedStr1Set, ...copiedStr2Set];
  return unionSet;
}

function intersection(str1Set, str2Set) {
  let intersectionSet = [];

  for (let i = 0; i < str1Set.length; i++) {
    let idx = str2Set.indexOf(str1Set[i]);
    if (idx !== -1) {
      str2Set.splice(idx, 1);
      intersectionSet.push(str1Set[i]);
    }
  }

  return intersectionSet;
}
