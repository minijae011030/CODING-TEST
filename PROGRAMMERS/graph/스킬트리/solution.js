// v1
function solution(skill, skill_trees) {
  var answer = skill_trees.length;
  let skills = skill.split("");

  skill_trees.forEach((s) => {
    let detail = s.split("");
    let idx = 0;
    for (let i = 0; i < detail.length; i++) {
      if (skills[idx] === detail[i]) {
        idx++;
      }
      if (skills.includes(detail[i]) && skills.indexOf(detail[i]) > idx) {
        answer--;
        break;
      }
    }
  });

  return answer;
}

// v2

function solution(skill, skill_trees) {
  var answer = skill_trees.length;
  let skills = skill.split("");

  skill_trees.forEach((s) => {
    let detail = s.split("");
    let idx = 0;
    for (let i = 0; i < detail.length; i++) {
      if (skills.includes(detail[i])) {
        let pos = skills.indexOf(detail[i]);
        if (pos === idx) idx++;
        else {
          answer--;
          break;
        }
      }
    }
  });

  return answer;
}
