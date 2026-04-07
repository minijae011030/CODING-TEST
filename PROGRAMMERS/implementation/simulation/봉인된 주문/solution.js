function solution(n, bans) {
  let numBans = bans.map(getNum).sort((a, b) => a - b);

  // [ 4, 5, 27, 31, 54 ]
  for (let numBan of numBans) {
    if (numBan <= n) n++;
    else break;
  }

  return getSpell(n);
}

// 단어 -> 10진수 변환
function getNum(spell) {
  let num = 0;

  for (let i = 0; i < spell.length; i++) {
    let char = spell.charCodeAt(i) - 96;
    num += char * Math.pow(26, spell.length - 1 - i);
  }

  return num;
}

// 10진수 -> 단어 변환
function getSpell(num) {
  console.log(num);
  let spell = [];
  num--;

  while (num >= 0) {
    let mod = num % 26;
    spell.push(String.fromCharCode(97 + mod));
    num = Math.floor(num / 26) - 1;
  }

  return spell.reverse().join("");
}
