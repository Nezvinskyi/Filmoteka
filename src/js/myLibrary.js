import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
import { movieAdapterModal } from './helpers/index';
import getRefs from './get-refs';
const refs = getRefs();

function getWatched() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));

  if (arrayOfStrings === null) {
    refs.btnWatched.classList.remove('btn-active-page');
    return;
  }

  renderFromLocalStorage(arrayOfStrings);
  refs.btnWatched.classList.add('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');
}

function getQueue() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('queue'));

  if (arrayOfStrings === null) {
    // refs.btnWatched.classList.remove('btn-active-page');
    return;
  }

  renderFromLocalStorage(arrayOfStrings);
  refs.btnQueue.classList.add('btn-active-page');
  refs.btnWatched.classList.remove('btn-active-page');
}

function renderFromLocalStorage(arrayOfStrings) {
  const movieDataList = arrayOfStrings.map(item => {
    let data = movieAdapterModal(JSON.parse(item));
    return data;
  });

  hideLoader();

  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
