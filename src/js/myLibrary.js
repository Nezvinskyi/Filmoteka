import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
import { movieAdapterModal } from './helpers/index';

import getRefs from './get-refs';
const refs = getRefs();

function getWatched() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));
  renderFromLocalStorage(arrayOfStrings);
}

function getQueue() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('queue'));
  renderFromLocalStorage(arrayOfStrings);
}

function renderFromLocalStorage(arrayOfStrings) {
  const movieDataList = arrayOfStrings.map(item => {
    let data = movieAdapterModal(JSON.parse(item));
    return data;
  });

  hideLoader();

  const containerFilmRef = document.querySelector('.container-film');
  containerFilmRef.innerHTML = '';

  refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
