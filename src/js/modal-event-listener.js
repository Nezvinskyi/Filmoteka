import moviesApi from './render-card';
import addModal from './modal';
import { movieAdapterModal } from './helpers/index';
import { onClickToWatchedHandler, onClickToQueueHandler } from './api/storage';
import openVideo from './video';

export function addEventListenerToGallery() {
  moviesApi.getRefs().gallery.addEventListener('click', onGalleryClick);
}

function onGalleryClick(event) {
  if (event.target.className !== 'card-img') return;

  moviesApi.movieId = event.target.dataset.id;
  moviesApi.getById().then(renderModal);
}

function renderModal(movie) {
  const movieId = movie.id;

  addModal(movieAdapterModal(movie));
  openVideo(movieId);

  onClickToQueueHandler(movie);
  onClickToWatchedHandler(movie);
}
