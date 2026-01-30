function solution(numbers) {
  let answer = [];
  numbers.forEach((number) => {
    let maxBinary = findBiggestBinary(number);
    answer.push(maxBinary);
  });

  return answer;
}

function findBiggestBinary(number) {
  if (number % 2 === 0) {
    return number + 1;
  }

  let binary = number.toString(2).split("");
  binary.unshift("0");

  for (let i = binary.length - 2; i >= 0; i--) {
    if (binary[i] === "0" && binary[i + 1] === "1") {
      binary[i] = "1";
      binary[i + 1] = "0";
      return parseInt(binary.join(""), 2);
    }
  }

  return parseInt(binary.join(""), 2);
}
