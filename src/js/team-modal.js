import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import getRefs from '../js/get-refs';
import markup from '../html/team-modal.html';

const refs = getRefs();
const teamModalRef = document.querySelector('.modal-team-js');

teamModalRef.addEventListener('click', openModal);

const modal = basicLightbox.create(markup, {
  onClose: instance => {
    refs.bodyRef.classList.remove('overflow-hidden');
  },
});

function openModal(event) {
  event.preventDefault();

  modal.show();
  refs.bodyRef.classList.add('overflow-hidden');

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
  const btnCloseRef = document.querySelector('.modal-btn-close');
  btnCloseRef.addEventListener('click', closeModalbyBtn);

  function closeModalbyBtn() {
    modal.close();

    btnCloseRef.removeEventListener('click', closeModalbyBtn);
  }
}
