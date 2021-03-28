import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

function addHeader() {
  const bodyRef = document.querySelector('body');
  const markup = headerTplt();

  bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
