import moviesApi from './render-card';
import cardListTpl from '../templates/film-list.hbs';
import getRefs from './get-refs';
import { movieAdapter } from './helpers/index';

const refs = getRefs();

async function renderPopularGalley() {
  const { results } = await moviesApi.getPopularMovies();
  const adaptedData = results.map(film => movieAdapter(film));
  const markup = cardListTpl(adaptedData);

  // рендерится верстка галлереи
  refs.header.insertAdjacentHTML('afterend', markup);

  // вызывается метод getRefs из класса и берем значение ключа gallery в объекте ссылок
  const dynamicGalleryRef = moviesApi.getRefs().gallery;
  console.warn('dynamic', dynamicGalleryRef);
}

// renderPopularGalley();
