import MoviesApi from './moviesApi';
const moviesApi = new MoviesApi();

import MoviesApi from './moviesApi';
const moviesApi = new MoviesApi();
// получить фильм по id
function onClick(movie) {
  moviesApi.movieId = movie;
  return movie;
}

const movie1Ref = document.querySelector('.js-1');
movie1Ref.addEventListener('click', getNewFilm);
const movie2Ref = document.querySelector('.js-2');
movie2Ref.addEventListener('click', getNewFilm1);
const movie3Ref = document.querySelector('.js-3');
movie3Ref.addEventListener('click', getNewFilm2);
const watchedRef = document.querySelector('.js-watched');
watchedRef.addEventListener('click', getWatched);

function getWatched() {
  console.log(JSON.parse(localStorage.getItem('watchLater')));
  return localStorage.getItem('watchLater');
}

function getNewFilm() {
  onClick(68); // Brazil
  const promise = moviesApi.getById();
  promise.then(film => {
    toLocalStor(film);
  });
}

function getNewFilm1() {
  onClick(73); //Brazil
  const promise = moviesApi.getById();
  promise.then(film => {
    toLocalStor(film);
  });
}

function getNewFilm2() {
  onClick(67); //Paradise Now
  const promise = moviesApi.getById();
  promise.then(film => {
    toLocalStor(film);
  });
}

let storage = [];
function toLocalStor(item) {
  // const locStor = JSON.parse(localStorage.getItem('watchLater'));
  // console.log('Checking locStor: >>parsed to array ', locStor);
  // if (locStor !== null) {
  //   locStor.forEach(item1 => {
  //     locStor.indexOf(item1);
  //   });
  // }

  const { id, title } = item;
  // console.log(id + title);

  const string = JSON.stringify({ id, title });
  const parsedString = JSON.parse(string);
  console.log(parsedString);

  const index = storage.indexOf(string);
  console.log(index);
  if (index > -1) {
    storage.splice(index, 1);
  } else {
    storage.push(string);
  }

  // console.log('Item added to storage: >>', storage);
  const stringFromObj = JSON.stringify(storage);
  localStorage.setItem('watchLater', stringFromObj);
  console.log('parsedstorage: >>', JSON.parse(stringFromObj));
  let endStorage = JSON.parse(stringFromObj);
  return endStorage;
}

// console.log(endStorage);

// const scores = [1, 2, 3, 4, 5];

// const deletedScores = scores.splice(3, 1);
// console.log(scores);
// console.log(deletedScores);
