import getRefs from '../js/get-refs';
const refs = getRefs();

function getWatched() {
  console.log(JSON.parse(localStorage.getItem('watched')));
  return localStorage.getItem('watched');
}

function getQueue() {
  console.log(JSON.parse(localStorage.getItem('queue')));
  return localStorage.getItem('queue');
}

refs.btnWatched.addEventListener('click', getWatched);
refs.btnQueue.addEventListener('click', getQueue);
