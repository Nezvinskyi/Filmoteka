import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
import { movieAdapterModal } from './helpers/index';
import getRefs from './get-refs';
const refs = getRefs();

function getWatched() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));

  if (arrayOfStrings === null || arrayOfStrings.length === 0) {
    const containerFilmRef = document.querySelector('[data-cont="container"]');
    // const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing in WATCHED library :( You should add something first or <span class="library-choosetext">choose QUEUE</span> by clicking the button up</span>`;
    const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the WATCHED</span>, yet :( You should add something first</span>`;

    containerFilmRef.innerHTML = initLibraryMarkup;
    refs.btnWatched.classList.remove('btn-active-page');
    refs.btnQueue.classList.remove('btn-active-page');

    return;
  }

  renderFromLocalStorage(arrayOfStrings);
  refs.btnWatched.classList.add('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');
}

function getQueue() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('queue'));

  if (arrayOfStrings === null || arrayOfStrings.length === 0) {
    refs.btnWatched.classList.remove('btn-active-page');

    const containerFilmRef = document.querySelector('[data-cont="container"]');
    const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the QUEUE</span>, yet :( You should add something first</span>`;
    containerFilmRef.innerHTML = initLibraryMarkup;
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

  // console.log(movieDataList);

  hideLoader();

  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
