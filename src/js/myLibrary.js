import cardList from '../templates/film-list.hbs';
import { hideLoader, showLoader } from './loader';
import { movieAdapterModal } from './helpers/index';
import dbUi from './api/db';
import getRefs from './get-refs';
const { btnWatched, btnQueue } = getRefs();

function getWatched() {
  dbUi.getAllWatchedData().then(data => {
    if (data == null) {
      watchedEmptyHandler();
      return;
    }

    renderData(data);
  });

  btnWatched.classList.add('btn-active-page');
  btnQueue.classList.remove('btn-active-page');
}

function getQueue() {
  dbUi.getAllQueueData().then(data => {
    if (data == null) {
      queueEmptyHandler();
      return;
    }

    renderData(data);
  });

  btnQueue.classList.add('btn-active-page');
  btnWatched.classList.remove('btn-active-page');
}

function watchedEmptyHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the WATCHED</span> yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  btnWatched.classList.add('btn-active-page');
  btnQueue.classList.remove('btn-active-page');
}

function queueEmptyHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the QUEUE</span>, yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  btnQueue.classList.add('btn-active-page');
  btnWatched.classList.remove('btn-active-page');
}

function renderData(data) {
  const movieDataList = data.map(item => {
    return movieAdapterModal(item);
  });
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}

btnWatched.addEventListener('click', getWatched);
btnQueue.addEventListener('click', getQueue);
