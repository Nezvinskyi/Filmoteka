import headerTplt from '../templates/header.hbs';

function addHeader() {
  const bodyRef = document.querySelector('body');
  const markup = headerTplt();

  bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
