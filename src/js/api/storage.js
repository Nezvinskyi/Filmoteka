import dbUi from './db';
import authUser from '../api/auth';
import getrefs from '../get-refs';

const refs = getrefs();

export function onClickToWatchedHandler(movie) {
  const btnAddToWatchedRef = document.querySelector('.btn-js-addtowatched');
  btnAddToWatchedRef.addEventListener('click', clickBtn);
  function clickBtn() {
    if (!authUser.userId || authUser.userId === 'undefined') {
      authUser.openModalAuth();
    } else {
      if (refs.libNav.classList.contains('current-page')) {
        console.log('dfsdfsdfsdfsd');
        console.log('мы в библиотеке. перерисовываем!!!!');
        setTimeout(getWatched, 2000);
      }
      saveToWatched(movie);
    }
  }
  actualyLibraryWached(movie);
}

export function onClickToQueueHandler(movie) {
  const btnAddToQueueRef = document.querySelector('.btn-js-addtoqueue');
  btnAddToQueueRef.addEventListener('click', clickBtn);
  function clickBtn() {
    if (!authUser.userId || authUser.userId === 'undefined') {
      authUser.openModalAuth();
    } else {
      if (refs.libNav.classList.contains('current-page')) {
        console.log('мы в библиотеке. перерисовываем!!!!');
      }
      saveToQueue(movie);
    }
  }
  actualyLibraryQueue(movie);
}

function saveToWatched(movie) {
  dbUi.dataWatchedHandler(movie);
  // a();
  // setTimeout(getWatched, 2000);
}
function saveToQueue(movie) {
  dbUi.dataQueueHandler(movie);
}

export function addClassBtnWached() {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.add('btn-active-page');
  modalBtnWached.innerHTML = 'Delete from wached';
}

export function deleteClassBtnWached() {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.remove('btn-active-page');
  modalBtnWached.innerHTML = 'Add to wached';

  const wachedLength = localStorage.getItem('watched_fb');
  const parsedWaced = JSON.parse(wachedLength);
  if (localStorage.getItem('watched_fb') !== null || parsedWaced.length !== 0) {
    if (parsedWaced.length <= 1) {
      localStorage.setItem('watched_fb', '[]');
      return;
    }
  }
}

export function addClassBtnQueue() {
  const modalBtn = document.querySelector('.btn-js-addtoqueue');
  modalBtn.classList.add('btn-active-page');
  modalBtn.innerHTML = 'Delete from queue';
}

export function deleteClassBtnQueue() {
  const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
  modalBtnQueue.classList.remove('btn-active-page');
  modalBtnQueue.innerHTML = 'Add to queue';

  const wachedLength = localStorage.getItem('queue_fb');
  const parsedWaced = JSON.parse(wachedLength);
  if (localStorage.getItem('queue_fb') !== null || parsedWaced.length !== 0) {
    if (parsedWaced.length <= 1) {
      localStorage.setItem('queue_fb', '[]');
      return;
    }
  }
}

function actualyLibraryQueue(movie) {
  const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
  modalBtnQueue.classList.remove('btn-active-page');
  const storageSaved = JSON.parse(localStorage.getItem('queue_fb'));

  if (localStorage.getItem('queue_fb') !== null)
    storageSaved.map(element => {
      if (movie.id === element.id) {
        const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
        modalBtnQueue.classList.add('btn-active-page');
        modalBtnQueue.innerHTML = 'Delete from queue';
        return;
      }
    });
}

function actualyLibraryWached(movie) {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.remove('btn-active-page');
  const getWachedId = JSON.parse(localStorage.getItem('watched_fb'));
  if (localStorage.getItem('watched_fb') !== null) {
    getWachedId.map(element => {
      if (movie.id === element.id) {
        const modalBtnWached = document.querySelector('.btn-js-addtowatched');
        modalBtnWached.classList.add('btn-active-page');
        modalBtnWached.innerHTML = 'Delete from wached';
        return;
      }
    });
  }
}

// =================================================================
// =================================================================
// import { getWatched, getQueue } from '../myLibrary';
import cardList from '../../templates/film-list.hbs';
import { hideLoader, showLoader } from '../loader';
import { movieAdapterModal } from '../helpers/index';
// import getRefs from './get-refs';
// const { btnWatched, btnQueue } = getRefs();

// console.log(dbUi.getWatched());

function getWatched() {
  // console.log('okokok');
  let arrayOfStrings = JSON.parse(localStorage.getItem('watched_fb'));

  if (arrayOfStrings === null || arrayOfStrings.length === 0) {
    hideLoader();
    watchedEmptyHandler();
    return;
  }

  renderFromLocalStorage(arrayOfStrings);
  refs.btnWatched.classList.add('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');
}

function getQueue() {
  showLoader();
  let arrayOfStrings = JSON.parse(localStorage.getItem('queue_fb'));

  if (arrayOfStrings === null || arrayOfStrings.length === 0) {
    hideLoader();
    queueEmptyHandler();
    return;
  }

  renderFromLocalStorage(arrayOfStrings);
  hideLoader();
  refs.btnQueue.classList.add('btn-active-page');
  refs.btnWatched.classList.remove('btn-active-page');
}

function watchedEmptyHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the WATCHED</span>, yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  refs.btnWatched.classList.add('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');
}

function queueEmptyHandler() {
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing <span class="library-choosetext">in the QUEUE</span>, yet :( You should add something first</span>`;
  containerFilmRef.innerHTML = initLibraryMarkup;
  refs.btnQueue.classList.add('btn-active-page');
  refs.btnWatched.classList.remove('btn-active-page');
}

function renderFromLocalStorage(arrayOfStrings) {
  console.log('>>', arrayOfStrings);
  const movieDataList = arrayOfStrings.map(item => {
    let data = movieAdapterModal(item);
    return data;
  });

  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
