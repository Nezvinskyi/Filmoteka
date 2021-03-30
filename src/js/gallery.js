import moviesApi from './render-card';
import cardList from '../templates/film-list.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';

const refs = getRefs();

moviesApi.getPopularMovies().then(({ results }) => {
  const movieDataList = results.map(item => movieAdapter(item));

  refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
});
