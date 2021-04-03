import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
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
    console.log(JSON.parse(item));
    return JSON.parse(item);
  });

  hideLoader();
  const containerFilmRef = document.querySelector('.container-film');
  containerFilmRef.innerHTML = '';

  refs.header.insertAdjacentHTML('afterend', cardList(movieDataList));
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
