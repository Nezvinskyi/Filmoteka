import moviesApi from './render-card';
import addModal from './modal';
import { movieAdapter } from './helpers/index';

export function addEventListenerToGallery() {
  moviesApi.getRefs().gallery.addEventListener('click', clickFilmCardHandler);
}

function clickFilmCardHandler(event) {
  if (event.target.className !== 'card-img') return;

  moviesApi.movieId = event.target.dataset.id;
  moviesApi.getById().then(renderModal);
}

function renderModal(movie) {
  addModal(movieAdapter(movie));
}
