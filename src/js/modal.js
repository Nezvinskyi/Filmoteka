import modalTemplate from '../templates/modal.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

export default function addModal(movie) {
  const markup = modalTemplate(movie);

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}
