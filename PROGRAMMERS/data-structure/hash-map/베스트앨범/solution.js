function solution(genres, plays) {
  let n = genres.length;

  let musicInfoArr = [];
  for (let i = 0; i < n; i++) {
    musicInfoArr.push([i, genres[i], plays[i]]);
  }

  // 1. 속한 노래가 많이 재생된 장르 찾기
  let genresMap = new Map();
  for (let i = 0; i < n; i++) {
    let genre = genres[i];
    let play = genresMap.get(genres[i]);

    if (genresMap.has(genre)) {
      genresMap.set(genre, play + plays[i]);
    } else {
      genresMap.set(genre, plays[i]);
    }
  }

  let genreArr = [...genresMap].sort((a, b) => b[1] - a[1]);

  // 2. 장르 내에서 많이 재생된 노래 찾기 -> 고유 번호 낮은 노래 찾기
  let album = [];
  for (let i = 0; i < genreArr.length; i++) {
    for (let j = 0; j < n; j++) {
      if (genreArr[i][0] === musicInfoArr[j][1]) {
        album.push(musicInfoArr[j]);
      }
    }
  }

  album.sort((a, b) => {
    if (a[1] === b[1]) return b[2] - a[2];
  });

  // 3. 장르별로 두개씩 모아 수록하기
  let answer = [];
  let cnt = 0;
  let curAlbum = album[0][1];
  for (let i = 0; i < n; i++) {
    if (curAlbum !== album[i][1]) {
      answer.push(album[i][0]);
      cnt = 1;
      curAlbum = album[i][1];
    } else {
      cnt++;
      if (cnt < 3) {
        answer.push(album[i][0]);
      }
    }
  }

  return answer;
}
