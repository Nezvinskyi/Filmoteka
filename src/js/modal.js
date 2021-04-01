import modalTemplate from '../templates/modal.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

function addModal() {
  const markup = modalTemplate();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);

  toLocalStor(movie);
}

addModal();
