import modalTemplate from '../templates/modal.hbs';
import { addToWatched, addToQueue } from './api/storage';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

function onOpenModal(callback) {
  const instance = basicLightbox.create(callback);
  instance.show();
  window.addEventListener("keydown", escCloseModal);
  
  const closeModalBtn = document.querySelector('.modal-btn-close');
  
  const closeModal = () => {
    instance.close();
    window.removeEventListener("keydown", escCloseModal);
  }

  function escCloseModal(event) {
    if (event.code === "Escape"){
        closeModal();
    }
}

  closeModalBtn.addEventListener('click', closeModal)
}



export default function addModal(movie) {
  const markup = modalTemplate(movie);
  
  onOpenModal(markup);


  addToWatched(movie);
  addToQueue(movie);

}

