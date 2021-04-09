import dbUi from './db';
import authUser from '../api/auth';

export function onClickToWatchedHandler(movie) {
  const btnAddToWatchedRef = document.querySelector('.btn-js-addtowatched');
  btnAddToWatchedRef.addEventListener('click', clickBtn);
  function clickBtn() {
    if (!authUser.userId || authUser.userId === 'undefined') {
      authUser.openModalAuth();
    } else {
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
      saveToQueue(movie);
    }
  }
  actualyLibraryQueue(movie);
}

function saveToWatched(movie) {
  dbUi.dataWatchedHandler(movie);
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
