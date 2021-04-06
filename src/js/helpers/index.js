// для генерации правильного пути к картинке, даты и жанров
import imgPoster from '../api/settings';
import imgNoPoster from '../api/settings';
import moviesApi from '../render-card';

const { POSTER_URL } = imgPoster;
const { NOPOSTER_URL } = imgNoPoster;

export const generatePosterPath = imageName => {
  if (imageName === null) {
    return `${NOPOSTER_URL}`;
  } else {
    return `${POSTER_URL}/${imageName}`;
  }
};
export const generatePoster = () => `${NOPOSTER_URL}`;

const convertYear = date => {
  return new Date(date).getFullYear();
};

function getVideoKey(key) {
  let urlVideo = `http://www.youtube.com/embed/${key}?autoplay=1&origin`;

  return urlVideo;
}

export function getGenreNames(genre_ids) {
  const genreNames = [];

  genre_ids.forEach(genre_id => {
    const item = moviesApi.genres.find(item => item.id === genre_id);
    genreNames.push(item.name);
  });
  return genreNames.slice(0, 3);
}

function getGenreNamesModal(genres) {
  const genreNames = [];
  genres.forEach(genre => genreNames.push(genre.name));

  return genreNames;
}

function getGenreIdModal(genres) {
  const genreId = [];
  genres.forEach(genre => genreId.push(genre.id));
  return genreId;
}

function cutTitle(original_title) {
  const arrTitle = original_title.split('');
  if (arrTitle.length > 33) {
    const newTitle = arrTitle.splice(0, 34);

    return newTitle.join('') + '...';
  } else {
    return arrTitle.join('');
  }
}

export const movieAdapter = ({
  poster_path,
  title,
  release_date,
  vote_average,
  vote_count,
  popularity,
  overview,
  id,
  genre_ids,
}) => ({
  imgSrc: generatePosterPath(poster_path),
  title: cutTitle(title),
  releaseDate: convertYear(release_date),
  voteAverage: vote_average,
  voteCount: vote_count,
  popularity: popularity,
  overview: overview,
  id: id,
  genresFirst: getGenreNames(genre_ids)[0],
  genresSecond: getGenreNames(genre_ids)[1],
  genresThird: getGenreNames(genre_ids)[2],
  genreIdFirst: genre_ids[0],
  genreIdSecond: genre_ids[1],
  genreIdThird: genre_ids[2],

  noPoster: generatePoster(),
});

export const movieAdapterVideo = ({ key }) => ({
  keyVideo: getVideoKey(key),
});

export const movieAdapterModal = ({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  release_date,
  id,
}) => ({
  imgSrc: generatePosterPath(poster_path),
  title: title,
  voteAverage: vote_average,
  voteCount: vote_count,
  popularity: popularity,
  genresFirst: getGenreNamesModal(genres)[0],
  genresSecond: getGenreNamesModal(genres)[1],
  genresThird: getGenreNamesModal(genres)[2],
  genreIdFirst: getGenreIdModal(genres)[0],
  genreIdSecond: getGenreIdModal(genres)[1],
  genreIdThird: getGenreIdModal(genres)[2],
  overview: overview,
  releaseDate: convertYear(release_date),
  id: id,
});
