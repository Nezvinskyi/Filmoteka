// для генерации правильного пути к картинке, даты и жанров
import imgPoster from '../api/settings';

const { POSTER_URL } = imgPoster;
const generatePosterPath = imageName => `${POSTER_URL}/${imageName}`;
const convertYear = date => {
  const d = new Date(date);
  return d.getFullYear();
};

async function getGenreName() {}

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
  releaseDate: convertYear(release_date),
  voteAverage: vote_average,
  homepage: homepage,
  voteCount: vote_count,
  popularity: popularity,
  overview: overview,
});
