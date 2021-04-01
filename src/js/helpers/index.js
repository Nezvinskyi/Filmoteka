// для генерации правильного пути к картинке, даты и жанров
import imgPoster from '../api/settings';
import imgNoPoster from '../api/settings';
import moviesApi from '../render-card';

const { POSTER_URL } = imgPoster;
const { NOPOSTER_URL } = imgNoPoster;

export const generatePosterPath = imageName => `${POSTER_URL}/${imageName}`;
export const generatePoster = () => `${NOPOSTER_URL}`;

const convertYear = date => {
  return new Date(date).getFullYear();
};

export function getGenreNames(genre_ids) {
  const genreNames = [];

  genre_ids.forEach(genre_id => {
    const item = moviesApi.genres.find(item => item.id === genre_id);
    genreNames.push(item.name);
  });
  return genreNames.slice(0, 3).join(', ');
}

function getGenreNamesModal(genres) {
  console.log(genres);
  const genreNames = [];
  genres.forEach(genre => genreNames.push(genre.name));
  return genreNames.join(', ');
}

function cutTitle(original_title) {
  const arrTitle = original_title.split('');
  if (arrTitle.length > 39) {
    const newTitle = arrTitle.splice(0, 40);

    return newTitle.join('') + '...';
  } else {
    return arrTitle.join('');
  }
}

export const movieAdapter = ({
  poster_path,
  original_title,
  release_date,
  vote_average,
  homepage,
  vote_count,
  popularity,
  overview,
  id,
  genre_ids,
}) => ({
  imgSrc: generatePosterPath(poster_path),
  title: cutTitle(original_title),
  releaseDate: convertYear(release_date),
  voteAverage: vote_average,
  homepage: homepage,
  voteCount: vote_count,
  popularity: popularity,
  overview: overview,
  id: id,
  genres: getGenreNames(genre_ids),
  noPoster: generatePoster(),
});

export const movieAdapterModal = ({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) => ({
  imgSrc: generatePosterPath(poster_path),
  title: original_title,
  voteAverage: vote_average,
  voteCount: vote_count,
  popularity: popularity,
  genres: getGenreNamesModal(genres),
  overview: overview,
});
