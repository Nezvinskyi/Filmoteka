import MoviesApi from './moviesApi';
const moviesApi = new MoviesApi();

let storage = [];
export default function toLocalStor(item) {
  //
  const btnAddToWatchedRef = document.querySelector('.js-addToWatched');
  btnAddToWatchedRef.addEventListener('click', item => {
    console.log('Gettin item: >>', item);
  });
  //
  // const btnAddToQueueRef = document.querySelector('.js-addToQueue');
  // btnAddToQueueRef.addEventListener('click', getNewFilm1);

  // console.log('Gettin item: >>', item);
  const locStor = JSON.parse(localStorage.getItem('watchLater'));
  console.log('Checking locStor: >>parsed to array ', locStor);

  const { title, imgSrc, voteAverage } = item;
  // console.log(title + imgSrc + voteAverage);

  const string = JSON.stringify({ title, imgSrc, voteAverage });
  const parsedString = JSON.parse(string);
  // console.log(parsedString);

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
  // console.log('parsedstorage: >>', JSON.parse(stringFromObj));
  let endStorage = JSON.parse(stringFromObj);
}

// === get array for rendering page ===
// function getWatched() {
//   console.log(JSON.parse(localStorage.getItem('watchLater')));
//   return localStorage.getItem('watchLater');
// }
