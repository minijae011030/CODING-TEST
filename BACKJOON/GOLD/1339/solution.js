const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

/**
 * 단어 수학 문제를 푸는 숙제
 * N개의 단어로 이루어져 있음
 * 각 단어는 알파벳 대문자로만 이루어짐
 * 알파벳 대문자를 0부터 9까지의 숫자 중 하나로 바꿔서 n개의 수를 합하는 문제
 * 같은 알파벳은 같은 숫자로 바꿔야함
 * 두 개 이상의 알파벳이 같은 숫자로 바뀌어지면 안됨
 *
 * 자릿수마다 10^idx * 알파벳 곱해서 더하기
 * 그리고 정렬..을 하면 어떨까
 */

const N = Number(input[0]);
const arr = [];
for (let i = 0; i < N; i++) {
  let num = input[i + 1]; // ACDEB
  let cnt = 0;
  while (num.length > 0) {
    let char = num[num.length - 1];
    num = num.slice(0, num.length - 1);
    arr.push({ num: Math.pow(10, cnt), char: char });
    cnt++;
  }
}

const computed = {};
for (let { char, num } of arr) {
  if (!(char in computed)) {
    computed[char] = 0;
  }
  computed[char] += num;
}

const computedArr = Object.entries(computed)
  .map(([char, sum]) => ({ char, sum }))
  .sort((a, b) => b.sum - a.sum);

let result = 0;
let num = 9;
for (let char of computedArr) {
  result += char.sum * num--;
}

console.log(result);
