import getRefs from '../js/get-refs';
const refs = getRefs();

function getWatched() {
  console.log(JSON.parse(localStorage.getItem('watchLater')));
  return localStorage.getItem('watchLater');
}

function getQueue() {
  console.log(JSON.parse(localStorage.getItem('queue')));
  return localStorage.getItem('queue');
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
