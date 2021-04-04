import moviesApi from './render-card';
import addModal from './modal';
import { movieAdapterModal } from './helpers/index';

export function addEventListenerToGallery() {
  moviesApi.getRefs().gallery.addEventListener('click', onGalleryClick);
}

function onGalleryClick(event) {
  console.log('eventListener ON');
  if (event.target.className !== 'card-img') return;

  moviesApi.movieId = event.target.dataset.id;
  moviesApi.getById().then(renderModal);
}

function renderModal(movie) {
  addModal(movieAdapterModal(movie));
}