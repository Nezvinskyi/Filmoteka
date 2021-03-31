// для генерации правильного пути к картинке, даты и жанров
import imgPoster from '../api/settings';

const { POSTER_URL } = imgPoster;
export const generatePosterPath = imageName => `${POSTER_URL}/${imageName}`;

export const movieAdapter = ({
  poster_path,
  original_title,
  release_date,
  vote_average,
  homepage,
  vote_count,
  popularity,
  overview,
}) => ({
  imgSrc: generatePosterPath(poster_path),
  title: original_title,
  releaseDate: release_date,
  voteAverage: vote_average,
  homepage: homepage,
  voteCount: vote_count,
  popularity: popularity,
  overview: overview,
});
