function solution(s) {
  let arr = s.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = convert(arr[i]);
  }

  return arr.join(" ");
}

function convert(s) {
  let arr = s.split("");
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) arr[i] = arr[i].toUpperCase();
    else arr[i] = arr[i].toLowerCase();
  }

  return arr.join("");
}
