function solution(fees, records) {
  let calculated_record = [];
  records.forEach((record) => {
    let [time, number, type] = record.split(" ");
    let [hour, min] = time.split(":").map(Number);
    let calculatedTime = hour * 60 + min;
    calculated_record.push([calculatedTime, number, type]);
  });

  calculated_record.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < calculated_record.length; i++) {
    let [time, number, type] = calculated_record[i];
    let prev = calculated_record[i - 1];
    if (i % 2 === 1 && type !== "OUT") {
      calculated_record.splice(i, 0, [
        23 * 60 + 59,
        calculated_record[i - 1][1],
        "OUT",
      ]);
    }
  }
  if (calculated_record[calculated_record.length - 1][2] !== "OUT") {
    calculated_record.push([
      23 * 60 + 59,
      calculated_record[calculated_record.length - 1][1],
      "OUT",
    ]);
  }

  let recordMap = new Map();
  for (let i = 0; i < calculated_record.length - 1; i += 2) {
    let inRecord = calculated_record[i];
    let outRecored = calculated_record[i + 1];

    let diff = outRecored[0] - inRecord[0];
    let number = inRecord[1];
    if (!recordMap.has(number)) recordMap.set(number, diff);
    else recordMap.set(number, recordMap.get(number) + diff);
  }

  let recordArray = [];

  recordMap.forEach((value, key) => {
    recordArray.push([key, value]);
  });

  let answer = [];

  for (let i = 0; i < recordArray.length; i++) {
    let fee = fees[1];

    if (recordArray[i][1] > fees[0]) {
      fee += Math.ceil((recordArray[i][1] - fees[0]) / fees[2]) * fees[3];
    }

    answer.push(fee);
  }

  return answer;
}
