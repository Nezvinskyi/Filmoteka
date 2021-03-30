import MoviesApi from './moviesApi';
const moviesApi = new MoviesApi();

const btnWatchedRef = document.querySelector('.js-watched');
btnWatchedRef.addEventListener('click', () => {
  onClick(67); //Brazil

  const promise = moviesApi.getById();

  promise.then(film => {
    toLocalStor1(film);
  });
});

const btnQueueRef = document.querySelector('.js-queue');
btnQueueRef.addEventListener('click', () => {
  onClick(68); //Brazi

  const promise = moviesApi.getById();

  promise.then(film => {
    toLocalStor2(film);
  });
});

// получить фильм по id
function onClick(movie) {
  moviesApi.movieId = movie;
}

// onClick(68); //Brazil
// onClick(69); //Walk the line
// onClick(67); // Paradise Now
// onClick(71); // Billy Elliot
// onClick(73); // American history X

const storageItem1 = [];

function toLocalStor1(item) {
  //add one obj to an array
  storageItem1.push(item.original_title);

  // --- --- transform 'arr of obj-s' to a string
  const stringFromObj = JSON.stringify(storageItem1);

  const savedStorage = localStorage.getItem('watched');
  // console.log('savedStorage: ', savedStorage);

  // setItem
  localStorage.setItem('watched', stringFromObj);
  const f = localStorage.getItem('watched');

  const storageAll = savedStorage + ',' + f;
  // console.log('storageAll: ', storageAll);

  return storageItem;
}

// способ 2
// let keys = Object.keys(localStorage);
// for (let key of keys) {
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }

const storageItem2 = [];

function toLocalStor2(item) {
  //add one obj to an array
  storageItem2.push(item.original_title);

  // --- --- transform 'arr of obj-s' to a string
  const stringFromObj = JSON.stringify(storageItem2);

  const savedStorage = localStorage.getItem('queue');
  // console.log('savedStorage: ', savedStorage);

  // setItem
  localStorage.setItem('queue', stringFromObj);
  const f = localStorage.getItem('queue');

  const storageAll = savedStorage + ',' + f;
  // console.log('storageAll: ', storageAll);

  return storageItem;
}
