import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import markup from '../html/team-modal.html';

// const markup = teamModalTpl(img);

const teamModal = document.querySelector('.modal-team-js');

teamModal.addEventListener('click', openModal);

const modal = basicLightbox.create(markup);

function openModal(event) {
  event.preventDefault();
  modal.show();
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
  const btnCloseRef = document.querySelector('.modal-team-close-button');
  btnCloseRef.addEventListener('click', closeModalbyBtn);
  function closeModalbyBtn() {
    modal.close();

    btnCloseRef.removeEventListener('click', closeModalbyBtn);
  }
}
