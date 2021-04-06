import moviesApi from './render-card';
import cardList from '../templates/film-list.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter, movieAdapterModal } from './helpers/index';
import { addEventListenerToGallery } from './modal-event-listener';
import { hideLoader, showLoader } from './loader';
import { onError, onFetchError, onInfo } from './components/notifications';
import {
  paginator,
  getDataPagination,
  pageCounter,
} from './components/pagination';
import paginationBtnsTpl from '../templates/pagination.hbs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

// отрисовка контейнера для галлереи
// перенести в html!!
const galleryContainerMarkup =
  '<div class="container gallery-js" data-cont="container"></div>';
document
  .querySelector('.header')
  .insertAdjacentHTML('afterend', galleryContainerMarkup);
const galleryRef = document.querySelector('.gallery-js');

// первый запуск - отрисовка галлереи, установка пагинации
initGallery();

async function initGallery() {
  pageCounter.page = 1;
  paginator.set('current', 1);
  try {
    const { results, total_results } = await moviesApi.getPopularMovies();
    renderData(results);
    setupPaginationBtns(total_results);
    hideLoader();

    // addEventListenerToGallery();
    // уже ж стоит слушатель?
    // поменять реф!
    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
    refs.header.addEventListener('click', onNavClick);
  } catch (error) {
    onFetchError();
  }
}

function onNavClick(event) {
  if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
    // console.log('clicked on:', event.target);
    initGallery();
    refs.searchForm.elements.query.value = '';
    showLoader();
    refs.libNav.classList.remove('current-page');
    refs.homeNav.classList.add('current-page');
    refs.header.classList.remove('library-header');
    refs.searchForm.classList.remove('visually-hidden');
    refs.headerBtnWrapper.classList.add('visually-hidden');
  }
  if (event.target.dataset.action === 'library') {
    // !!! если не авторизовано, то модалка регистрации/входа

    refs.homeNav.classList.remove('current-page');
    refs.libNav.classList.add('current-page');
    refs.header.classList.add('library-header');
    refs.searchForm.classList.add('visually-hidden');
    refs.headerBtnWrapper.classList.remove('visually-hidden');
    refs.pagination.classList.add('visually-hidden');
    const initLibraryMarkup = `<span class="library-inittext" style="text-align: center; display: block; margin-top: 25px">There’s nothing here, yet :( You should add something first</span>`;
    moviesApi.getRefs().gallery.innerHTML = initLibraryMarkup;

    getWatched();
  }
}

async function onSearch(event) {
  event.preventDefault();

  moviesApi.fetchMethod = 'query';
  pageCounter.page = 1;
  paginator.set('current', 1);

  //!!loader start!!
  // showLoader();

  moviesApi.query = event.currentTarget.elements.query.value.trim();

  if (moviesApi.query === '') {
    // hideLoader();
    return onError();
  }

  try {
    const { results, total_results } = await moviesApi.getMoviesByQuery();

    if (results.length === 0) {
      //позже добавить надо будет
      // clearInput();
      return onError();
    } else onInfo(`found ${total_results} movies`);
    renderData(results);

    setupPaginationBtns(total_results);
  } catch (error) {
    // .then(hideLoader) !!
    onFetchError();
  }
  //!!clearInput!!
}

function renderData(results) {
  refs.pagination.classList.remove('visually-hidden');
  // galleryRef.innerHTML = '';
  const movieDataList = results.map(item => {
    return movieAdapter(item);
  });
  galleryRef.innerHTML = cardList(movieDataList);
  addEventListenerToGallery();
}

function setupPaginationBtns(total_results) {
  paginator.set('totalResult', total_results);
  const { range, last } = paginator.getPaginationData();
  const markup = paginationBtnsTpl({ range, last });
  const paginationRef = document.querySelector('.pagination-js');
  paginationRef.innerHTML = markup;
  paginationRef.addEventListener('click', onPaginationClick);

  // скрыть крайние на краях диапазона
  const firstBtnRef = document.querySelector('[data-nav="first"]');
  const lastBtnRef = document.querySelector('[data-nav="last"]');
  const btnsNumRefs = document.querySelectorAll('[data-num]');

  // подсветить текущую кнопку, убрать лишние элементы на краям диапазона
  btnsNumRefs.forEach(el => {
    if (el.textContent == pageCounter.page) {
      el.classList.add('active');
    }
  });

  if (pageCounter.page > 3) {
    firstBtnRef.classList.remove('visually-hidden');
  }
  if (pageCounter.page > 4) {
    firstBtnRef.nextElementSibling.classList.remove('visually-hidden');
  }
  if (pageCounter.page > paginator.getPaginationData().last - 3) {
    lastBtnRef.classList.add('visually-hidden');
  }
  if (pageCounter.page > paginator.getPaginationData().last - 4) {
    lastBtnRef.previousElementSibling.classList.add('visually-hidden');
  }
}

function onPaginationClick(e) {
  if (!e.target.hasAttribute('data-nav') && !e.target.hasAttribute('data-num'))
    return;

  if (e.target.dataset.nav === 'prev') {
    if (pageCounter.page <= 1) return;
    pageCounter.decrement();
  } else if (e.target.dataset.nav === 'first') {
    pageCounter.page = 1;
  } else if (e.target.dataset.nav === 'next') {
    if (pageCounter.page >= paginator.getPaginationData().last) return;
    pageCounter.increment();
  } else if (e.target.dataset.nav === 'last') {
    pageCounter.page = paginator.getPaginationData().last;
  } else {
    pageCounter.page = e.target.dataset.num;
  }
  paginator.set('current', pageCounter.page);

  if (moviesApi.fetchMethod === 'popular') {
    renderPopularGallery();
  } else if (moviesApi.fetchMethod === 'query') {
    renderSearchGallery();
  } else if (moviesApi.fetchMethod === 'genre') {
    renderGenreGallery();
  } else if (moviesApi.fetchMethod === 'year') {
    renderDateGallery();
  }
  setupPaginationBtns(paginator.getPaginationData().totalResult);
}

async function renderSearchGallery() {
  const { results, total_results } = await moviesApi.getMoviesByQuery();
  renderData(results);
}

async function renderPopularGallery() {
  const { results, total_results } = await moviesApi.getPopularMovies();
  renderData(results);
}

async function renderGenreGallery() {
  const { results, total_results } = await moviesApi.getSearchGenres();
  renderData(results);
}

async function renderDateGallery() {
  const { results, total_results } = await moviesApi.getSearchYear();
  renderData(results);
}

async function initGenreGallery(e) {
  e.preventDefault();

  moviesApi.fetchMethod = 'genre';
  pageCounter.page = 1;
  paginator.set('current', 1);

  // clear active status of library buttons
  refs.btnWatched.classList.remove('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');

  const genre = await e.target;
  moviesApi.searchGenre = genre.dataset.id;

  showLoader();

  try {
    const { results, total_results } = await moviesApi.getSearchGenres();
    setupPaginationBtns(total_results);
    renderData(results);
    addEventListenerToGallery();
    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
    hideLoader();
  } catch (error) {
    onFetchError();
  }
}

async function initDateGallery(e) {
  moviesApi.fetchMethod = 'year';
  pageCounter.page = 1;
  paginator.set('current', 1);

  // clear active status of library buttons
  refs.btnWatched.classList.remove('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');

  try {
    const date = await e.target.textContent;
    moviesApi.searchYear = date;
    showLoader();
    const { results, total_results } = await moviesApi.getSearchYear();

    renderData(results);
    addEventListenerToGallery();

    setupPaginationBtns(total_results);

    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
    hideLoader();
  } catch (error) {
    onFetchError();
  }
}

export default function searchGenreDate(e) {
  if (e.target.dataset.search === 'ok') {
    initGenreGallery(e);
  } else if (e.target.dataset.set === 'releaseDate') {
    initDateGallery(e);
  } else {
    return;
  }
}

function getWatched() {
  let keys = Object.keys(localStorage);
  let arr = [];
  for (let key of keys) {
    let keyName = `${key}`;
    arr.push(keyName);
  }
  const localStorageKeys = arr.map(item => {
    if (item === 'watched' || item === 'queue') {
      let data = item;
      return data;
    }
  });

  if (localStorageKeys.includes('watched')) {
    let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));

    if (arrayOfStrings === null && arrayOfStrings.length === 0) {
      refs.btnWatched.classList.remove('btn-active-page');
      const containerFilmRef = document.querySelector(
        '[data-cont="container"]',
      );
      const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing in the QUEUE, yet :( You should add something first</span>`;
      containerFilmRef.innerHTML = initLibraryMarkup;
    } else {
      let arrayOfStrings5 = JSON.parse(localStorage.getItem('watched'));
      refs.btnWatched.classList.add('btn-active-page');
      refs.btnQueue.classList.remove('btn-active-page');
      renderFromLocalStorage(arrayOfStrings5);
      return;
    }
  } else if (localStorageKeys.includes('queue')) {
    refs.btnWatched.classList.remove('btn-active-page');
    let arrayOfStrings = JSON.parse(localStorage.getItem('queue'));
    if (arrayOfStrings === null && arrayOfStrings.length === 0) {
      refs.btnWatched.classList.remove('btn-active-page');
      const containerFilmRef = document.querySelector(
        '[data-cont="container"]',
      );
      const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing here, yet :( You should add something first</span>`;
      containerFilmRef.innerHTML = initLibraryMarkup;
    } else {
      let arrayOfStrings5 = JSON.parse(localStorage.getItem('queue'));
      refs.btnQueue.classList.add('btn-active-page');
      refs.btnWatched.classList.remove('btn-active-page');
      renderFromLocalStorage(arrayOfStrings5);
    }
  } else {
    refs.btnQueue.classList.remove('btn-active-page');
    refs.btnWatched.classList.remove('btn-active-page');
  }
}

function renderFromLocalStorage(arrayOfStrings) {
  const movieDataList = arrayOfStrings.map(item => {
    let data = movieAdapterModal(JSON.parse(item));
    return data;
  });
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}
refs.btnWatched.addEventListener('click', getWatched);

import { AuthApp } from './auth';
console.log(AuthApp);
console.log('Андрей, твоя точка входа - функция onNavClick.  строка 63');
