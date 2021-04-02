import modalTemplate from '../templates/modal.hbs';
import getRefs from '../js/get-refs';
import { addToWatched, addToQueue } from './api/storage';

import moviesApi from './render-card';
import searchGenreDate from './gallery';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

function onOpenModal(callback) {
  const instance = basicLightbox.create(callback);
  instance.show();

  const closeModalBtn = document.querySelector('.modal-btn-close');
  const closeModal = () => instance.close();

  closeModalBtn.addEventListener('click', closeModal);

  moviesApi.getRefs().listGenreModal.addEventListener('click', closeModal);
  moviesApi.getRefs().listGenreModal.addEventListener('click', searchGenreDate);
}

const refs = getRefs();

export default function addModal(movie) {
  const markup = modalTemplate(movie);

  onOpenModal(markup);

  addToWatched(movie);
  addToQueue(movie);
}
