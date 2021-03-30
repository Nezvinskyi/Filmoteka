import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';
import cardList from '../templates/film-list.hbs';
import filmCard from '../templates/film-card.hbs';
import moviesApi from './render-card';

let refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
refs = getRefs();

refs.pagesNav.addEventListener('click', onNavClick);
refs.searchForm.addEventListener('submit', onSearch);

function onNavClick(event) {
  if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
    refs.libNav.classList.remove('current-page');
    refs.homeNav.classList.add('current-page');
    refs.header.classList.remove('library-header');
    refs.searchForm.classList.remove('visually-hidden');
    refs.headerBtnWrapper.classList.add('visually-hidden');

    moviesApi.getPopularMovies().then(({ results }) => {
      const movieDataList = results.map(item => movieAdapter(item));

      moviesApi.getRefs().gallery.innerHTML = filmCard(movieDataList);
    });
  }

  if (event.target.dataset.action === 'library') {
    refs.homeNav.classList.remove('current-page');
    refs.libNav.classList.add('current-page');
    refs.header.classList.add('library-header');
    refs.searchForm.classList.add('visually-hidden');
    refs.headerBtnWrapper.classList.remove('visually-hidden');
  }
}

function onSearch(event) {
  event.preventDefault();
  moviesApi.getRefs().gallery;
  moviesApi.query = event.currentTarget.elements.query.value;

  moviesApi.getMoviesByQuery().then(({ results }) => {
    const movieDataList = results.map(item => movieAdapter(item));

    moviesApi.getRefs().gallery.innerHTML = filmCard(movieDataList);
  });

  clearInput(event);
}

function clearInput(event) {
  event.currentTarget.elements.query.value = '';
}
