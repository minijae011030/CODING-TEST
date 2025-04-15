const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let CardArray = input[1].split(" ").map(Number);
let QuestionCardArray = input[3].split(" ").map(Number);

let HasCardArray = new Map();
for (card of CardArray) {
  if (HasCardArray.has(card)) {
    HasCardArray.set(card, HasCardArray.get(card) + 1);
  } else {
    HasCardArray.set(card, 1);
  }
}

let AnswerArray = [];
for (card of QuestionCardArray) {
  if (HasCardArray.has(card)) {
    AnswerArray.push(HasCardArray.get(card));
  } else {
    AnswerArray.push(0);
  }
}

console.log(AnswerArray.join(" "));
