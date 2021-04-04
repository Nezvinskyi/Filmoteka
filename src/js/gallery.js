import moviesApi from './render-card';
import cardList from '../templates/film-list.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';
import { addEventListenerToGallery } from './modal-event-listener';
import { hideLoader, showLoader } from './loader';
import { onError, onFetchError } from './components/notifications';
import {
  paginator,
  getDataPagination,
  pageCounter,
} from './components/pagination';
import paginationBtnsTpl from '../templates/pagination.hbs';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

// первый запуск - отрисовка галлереи, установка пагинации
initGallery();

async function initGallery() {
  moviesApi
    .getPopularMovies()
    .then(({ results, total_results }) => {
      // console.log('initial render. method:>>', moviesApi.fetchMethod);
      const movieDataList = results.map(item => {
        return movieAdapter(item);
      });

      refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
      addEventListenerToGallery();
      //

      moviesApi
        .getRefs()
        .divContainer.addEventListener('click', searchGenreDate);

      // console.log(total_results);

      //rendering pagination btns
      paginator.set('totalResult', total_results);
      setupPaginationBtns(
        paginator.getPaginationData().range,
        paginator.getPaginationData().last,
      );
    })
    .then(hideLoader)
    .catch(onFetchError);
}

async function onSearch(event) {
  event.preventDefault();

  moviesApi.fetchMethod = 'query';
  pageCounter.page = 1;
  paginator.set('current', 1);

  // console.log('from search. method:>>', moviesApi.fetchMethod);

  //!!loader start!!
  // showLoader();

  moviesApi.query = event.currentTarget.elements.query.value.trim();

  if (moviesApi.query === '') {
    // hideLoader();
    return onError();
  }

  try {
    const { results, total_results } = await moviesApi.getMoviesByQuery();

    renderData(results);

    paginator.set('totalResult', total_results);
    setupPaginationBtns(
      paginator.getPaginationData().range,
      paginator.getPaginationData().last,
    );
    console.log('найдено', total_results, 'фильмов');
  } catch (error) {
    // .then(hideLoader) !!
    onFetchError();
  }
  //!!clearInput!!
}

function renderData(results) {
  moviesApi.getRefs().divContainer.innerHTML = '';
  const movieDataList = results.map(item => {
    return movieAdapter(item);
  });
  refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
  addEventListenerToGallery();
}

function setupPaginationBtns(range, lastPage) {
  const markup = paginationBtnsTpl({ range, lastPage });
  const paginationRef = document.querySelector('.pagination-js');
  paginationRef.innerHTML = markup;
  paginationRef.addEventListener('click', onPaginationClick);
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
  // console.log('pageCounter:>>', pageCounter.page);
  paginator.set('current', pageCounter.page);
  // console.log(
  //   'currentPaginationPage:>>',
  //   paginator.getPaginationData().current,
  // );

  if (moviesApi.fetchMethod === 'popular') {
    // console.log('render popular', pageCounter.page);
    popularRender();
  } else if (moviesApi.fetchMethod === 'query') {
    // console.log('render query', pageCounter.page);
    searchRender();
  }
  setupPaginationBtns(
    paginator.getPaginationData().range,
    paginator.getPaginationData().last,
  );

  // подсветить активную кнопку
  // скрыть крайние на краях диапазона
  const firstBtnRef = document.querySelector('[data-nav="first"]');
  const lastBtnRef = document.querySelector('[data-nav="last"]');
  const btnsRefs = document.querySelectorAll('.page-btn');

  btnsRefs.forEach(el => {
    if (el.textContent === pageCounter.page) {
      el.classList.add('active');
    }
  });

  if (pageCounter.page > 4) {
    firstBtnRef.classList.remove('visually-hidden');
    firstBtnRef.nextElementSibling.classList.remove('visually-hidden');
    // firstBtnRef.previousElementSibling.classList.remove('visually-hidden');
  }

  if (pageCounter.page > paginator.getPaginationData().last - 3) {
    lastBtnRef.classList.add('visually-hidden');
    // lastBtnRef.nextElementSibling.classList.add('visually-hidden');
    lastBtnRef.previousElementSibling.classList.add('visually-hidden');
  }
}

async function searchRender() {
  const { results, total_results } = await moviesApi.getMoviesByQuery();
  renderData(results);
}

async function popularRender() {
  const { results, total_results } = await moviesApi.getPopularMovies();
  renderData(results);
}

async function renderGenereGallery(e) {
  e.preventDefault();

  const genre = await e.target;
  const idGenre = genre.dataset.id;
  showLoader();
  await moviesApi
    .getSearchGenres(idGenre)
    .then(({ results }) => {
      const movieGenreList = results.map(item => {
        return movieAdapter(item);
      });

      moviesApi.getRefs().divContainer.innerHTML = '';
      refs.header.insertAdjacentHTML('afterend', cardList(movieGenreList));
      addEventListenerToGallery();

      moviesApi
        .getRefs()
        .divContainer.addEventListener('click', searchGenreDate);
    })
    .then(hideLoader)
    .catch(onFetchError);
}

async function renderDateRelease(e) {
  const date = await e.target.textContent;
  console.log(date);
  showLoader();
  await moviesApi
    .getSearchYear(date)
    .then(({ results }) => {
      const moviDataList = results.map(item => {
        return movieAdapter(item);
      });

      moviesApi.getRefs().divContainer.innerHTML = '';
      refs.header.insertAdjacentHTML('afterend', cardList(moviDataList));
      addEventListenerToGallery();

      moviesApi
        .getRefs()
        .divContainer.addEventListener('click', searchGenreDate);
    })
    .then(hideLoader)
    .catch(onFetchError);
}

export default function searchGenreDate(e) {
  if (e.target.dataset.search === 'ok') {
    renderGenereGallery(e);
  } else if (e.target.dataset.set === 'releaseDate') {
    renderDateRelease(e);
  } else {
    return;
  }
}
