import { onError, onFetchError, onInfo } from '../components/notifications';

export function onClickToWatchedHandler(movie) {
  const btnAddToWatchedRef = document.querySelector('.btn-js-addtowatched');
  btnAddToWatchedRef.addEventListener('click', clickBtn);
  function clickBtn(event) {
    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', '[]');
    }
    saveToWatched(movie);
  }
}

export function onClickToQueueHandler(movie) {
  const btnAddToQueueRef = document.querySelector('.btn-js-addtoqueue');
  btnAddToQueueRef.addEventListener('click', clickBtn);
  function clickBtn(event) {
    if (localStorage.getItem('queue') === null) {
      localStorage.setItem('queue', '[]');
    }
    saveToQueue(movie);
  }
}

function saveToWatched(movie) {
  let storage = JSON.parse(localStorage.getItem('watched'));
  const {
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
  } = movie;

  const string = JSON.stringify({
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
  });

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
    onInfo('Deleted from watched');
  } else {
    storage.push(string);
    onInfo('Added to watched');
  }
  const stringFromObj = JSON.stringify(storage);
  // let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('watched', stringFromObj);
  // return endStorage;
}

function saveToQueue(movie) {
  let storage = JSON.parse(localStorage.getItem('queue'));
  const {
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
  } = movie;

  const string = JSON.stringify({
    title,
    genres,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
    id,
  });

  const index = storage.indexOf(string);
  if (index > -1) {
    storage.splice(index, 1);
    onInfo('Deleted from queue');
  } else {
    storage.push(string);
    onInfo('Added to queue');
  }
  const stringFromObj = JSON.stringify(storage);
  // let endStorage = JSON.parse(stringFromObj);
  localStorage.setItem('queue', stringFromObj);
  // return endStorage;
}
