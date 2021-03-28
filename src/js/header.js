import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
