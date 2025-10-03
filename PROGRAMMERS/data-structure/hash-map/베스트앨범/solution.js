function solution(genres, plays) {
  var answer = [];

  let PlaysMap = new Map();
  let SongsArray = [];

  for (let i = 0; i < genres.length; i++) {
    PlaysMap.set(genres[i], (PlaysMap.get(genres[i]) || 0) + plays[i]);
  }
  let PlaysArray = [...PlaysMap].sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < genres.length; i++) {
    SongsArray.push({ index: i, genre: genres[i], play: plays[i] });
  }
  SongsArray.sort((a, b) => b.play - a.play);

  PlaysArray.forEach(([genre, _]) => {
    let cnt = 0;
    for (let i = 0; i < SongsArray.length; i++) {
      if (cnt < 2 && genre === SongsArray[i].genre) {
        answer.push(SongsArray[i].index);
        cnt++;
      }
    }
  });

  return answer;
}
