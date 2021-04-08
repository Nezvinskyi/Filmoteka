import { onError, onFetchError, onInfo } from '../components/notifications';
import getRefs from '../get-refs';
import dbUi from './db';

const refs = getRefs();
checkLocalStorage();

export function onClickToWatchedHandler(movie) {
  const btnAddToWatchedRef = document.querySelector('.btn-js-addtowatched');
  btnAddToWatchedRef.addEventListener('click', clickBtn);
  function clickBtn() {
    checkLocalStorage();
    saveToWatched(movie);
  }
  actualyLibraryWached(movie);
}

export function onClickToQueueHandler(movie) {
  const btnAddToQueueRef = document.querySelector('.btn-js-addtoqueue');
  btnAddToQueueRef.addEventListener('click', clickBtn);
  function clickBtn() {
    console.log('QUEUE!');
    saveToQueue(movie);
  }
  actualyLibraryQueue(movie);
}
function checkLocalStorage() {
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', '[]');
  }

  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', '[]');
  }
}

// Wached ====================================================
function saveToWatched(movie) {
  dbUi.dataWatchedHandler(movie);

  let storage = JSON.parse(localStorage.getItem('watched'));
  const {
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
    popularity,
  } = movie;

  const string = JSON.stringify({
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
    popularity,
  });

  // =========================
  //====Тимчасово закоментував щоб пофіксити баг з кнопками (Ярослав).=====//
  // getDbId(movie, 158);
  // function getDbId(data, movieId) {
  //   const watchedIds = Object.entries(data.watched);
  //   console.log(watchedIds);
  //   const targetId = watchedIds.find(([id, obj]) => obj.id === movieId)[0];
  //   return targetId;
  // }
  // dbUi.addToWatched(movie);

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
    onInfo('Deleted from watched');
    deleteClassBtnWached();
  } else {
    storage.push(string);
    onInfo('Added to watched');
    addClassBtnWached();
  }
  const stringFromObj = JSON.stringify(storage);
  // let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('watched', stringFromObj);
  // return endStorage;
}

function addClassBtnWached() {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.add('btn-active-page');
  modalBtnWached.innerHTML = 'Delete from wached';
}

function deleteClassBtnWached() {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.remove('btn-active-page');
  modalBtnWached.innerHTML = 'Add to wached';
}

function actualyLibraryWached(movie) {
  const modalBtnWached = document.querySelector('.btn-js-addtowatched');
  modalBtnWached.classList.remove('btn-active-page');
  let storageSaved = JSON.parse(localStorage.getItem('watched'));
  storageSaved.forEach(element => {
    const elementOfStorage = JSON.parse(element);
    const findedMovie = elementOfStorage.id === movie.id;
    if (findedMovie) {
      const modalBtnWached = document.querySelector('.btn-js-addtowatched');
      modalBtnWached.classList.add('btn-active-page');
      modalBtnWached.innerHTML = 'Delete from wached';
      return;
    }
  });
}
// Queue ====================================================

function saveToQueue(movie) {
  dbUi.dataQueueHandler(movie);

  let storage = JSON.parse(localStorage.getItem('queue'));
  const {
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
    popularity,
  } = movie;

  const string = JSON.stringify({
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
    popularity,
  });

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
    onInfo('Deleted from queue');
    addClassBtnQueue();
  } else {
    storage.push(string);
    onInfo('Added to queue');
    deleteClassBtnQueue();
  }
  const stringFromObj = JSON.stringify(storage);
  // let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('queue', stringFromObj);
  // return endStorage;
}

function addClassBtnQueue() {
  const modalBtn = document.querySelector('.btn-js-addtoqueue');
  modalBtn.classList.remove('btn-active-page');
  modalBtn.innerHTML = 'Add to queue';
}

function deleteClassBtnQueue() {
  const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
  modalBtnQueue.classList.add('btn-active-page');
  modalBtnQueue.innerHTML = 'Delete from queue';
}

function actualyLibraryQueue(movie) {
  const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
  modalBtnQueue.classList.remove('btn-active-page');
  let storageSaved = JSON.parse(localStorage.getItem('queue'));
  storageSaved.forEach(element => {
    const elementOfStorage = JSON.parse(element);
    const findedMovie = elementOfStorage.id === movie.id;
    if (findedMovie) {
      const modalBtnQueue = document.querySelector('.btn-js-addtoqueue');
      modalBtnQueue.classList.add('btn-active-page');
      modalBtnQueue.innerHTML = 'Delete from queue';
      return;
    }
  });
}
