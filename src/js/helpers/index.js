// для генерации правильного пути к картинке, даты и жанров
import imgPoster from '../api/settings';
import moviesApi from '../render-card';

const { POSTER_URL } = imgPoster;
export const generatePosterPath = imageName => `${POSTER_URL}/${imageName}`;
const convertYear = date => {
  return new Date(date).getFullYear();
};

async function getGenreNames(genre_ids) {
  const genreNames = [];
  const data = await moviesApi.getGenres();
  genre_ids.forEach(genre_id => {
    const item = data.find(item => item.id === genre_id);
    genreNames.push(item.name);
  });
  console.log(genreNames.join(', '));
  return genreNames.join(', ');
}
getGenreNames([18, 12]);

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
  title: original_title,
  releaseDate: convertYear(release_date),
  voteAverage: vote_average,
  homepage: homepage,
  voteCount: vote_count,
  popularity: popularity,
  overview: overview,
  id: id,
  genres: getGenreNames(genre_ids),
});
