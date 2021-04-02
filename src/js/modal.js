import modalTemplate from '../templates/modal.hbs';
import getRefs from '../js/get-refs';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

function onOpenModal(callback) {
  const instance = basicLightbox.create(callback);
  instance.show();
  
  const closeModalBtn = document.querySelector('.modal-btn-close')
  const closeModal = () => instance.close();

  closeModalBtn.addEventListener('click', closeModal)

}


const refs = getRefs();

export default function addModal(movie) {
  const markup = modalTemplate(movie);
  // refs.bodyRef.insertAdjacentHTML('afterbegin', onOpenModal);
  onOpenModal(markup);
}

