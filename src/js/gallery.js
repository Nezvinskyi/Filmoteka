import moviesApi from './render-card';
import cardList from '../templates/film-list.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';
import { addEventListenerToGallery } from './modal-event-listener';
import { hideLoader, showLoader } from './loader';

const refs = getRefs();
moviesApi
  .getPopularMovies()
  .then(({ results }) => {
    const movieDataList = results.map(item => {
      return movieAdapter(item);
    });

    refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
    addEventListenerToGallery();

    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
  })
  .then(hideLoader);

async function renderGenereGallery(e) {
  const genre = await e.target;
  const idGenre = genre.dataset.id;

  await moviesApi.getSearchGenres(idGenre).then(({ results }) => {
    const movieGenreList = results.map(item => {
      return movieAdapter(item);
    });

    moviesApi.getRefs().divContainer.innerHTML = '';
    refs.header.insertAdjacentHTML('afterend', cardList(movieGenreList));
    addEventListenerToGallery();

    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
  });
}

async function renderDateRelease(e) {
  const date = await e.target.textContent;
  console.log(date);
  await moviesApi.getSearchYear(date).then(({ results }) => {
    const moviDataList = results.map(item => {
      return movieAdapter(item);
    });

    moviesApi.getRefs().divContainer.innerHTML = '';
    refs.header.insertAdjacentHTML('afterend', cardList(moviDataList));
    addEventListenerToGallery();

    moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);
  });
}

function searchGenreDate(e) {
  if (e.target.dataset.search === 'ok') {
    renderGenereGallery(e);
  } else if (e.target.dataset.set === 'releaseDate') {
    renderDateRelease(e);
  } else {
    return;
  }
}
