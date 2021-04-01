import modalTemplate from '../templates/modal.hbs';
import getRefs from '../js/get-refs';
import toLocalStor from './api/storage';

const refs = getRefs();

export default function addModal(movie) {
  const markup = modalTemplate(movie);

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);

  toLocalStor(movie);
}
