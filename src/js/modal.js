import modalTemplate from '../templates/modal.hbs';
import { addToWatched, addToQueue } from './api/storage';
import getRefs from '../js/get-refs';

import moviesApi from './render-card';
import searchGenreDate from './gallery';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

function onOpenModal(callback) {
  const instance = basicLightbox.create(callback);
  instance.show();
  window.addEventListener('keydown', escCloseModal);

  const closeModalBtn = document.querySelector('.modal-btn-close');
  const closeModal = () => {
    instance.close();
    window.removeEventListener('keydown', escCloseModal);
  };

  function escCloseModal(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

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

  const modalContainer = document.querySelector('.modal-container');
  const modalCloseBtn = document.querySelector('.modal-btn-close_container');
  const youtubeModalContainer = document.querySelector('#modal-youtube');

  const youtubeModalBtn = document.querySelector('#trailer');
  const closeYoutubeModalBtn = document.querySelector('#closeYoutubeModalBtn');

  youtubeModalBtn.addEventListener('click', openModalYoutube);
  closeYoutubeModalBtn.addEventListener('click', closeModalYoutube);

  function openModalYoutube() {
    console.log('beefore');
    modalContainer.classList.add('visually-hidden');
    modalCloseBtn.classList.add('visually-hidden');
    youtubeModalContainer.classList.remove('visually-hidden');
    youtubeModalContainer.classList.add('.is-open');
    console.log('after');
  }

  function closeModalYoutube() {
    console.log('beefore close');

    youtubeModalContainer.classList.remove('.is-open');
    youtubeModalContainer.classList.add('visually-hidden');
    modalContainer.classList.remove('visually-hidden');
    modalCloseBtn.classList.remove('visually-hidden');

    console.log('after close');
  }
}
