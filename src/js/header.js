import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();

const searchFormRef = document.getElementById('search-form');
const homeNavRef = document.querySelector('.home-page-js');
const libNavRef = document.querySelector('.library-page-js');
const pagesNav = document.querySelector('.header-nav');
const headerRef = document.querySelector('.header');

pagesNav.addEventListener('click', onNavClick);
searchFormRef.addEventListener('submit', onSearch);

function onNavClick(event) {
  if (event.target.dataset.action === 'home') {
    libNavRef.classList.remove('current-page');
    homeNavRef.classList.add('current-page');

    headerRef.classList.remove('library-header');
  }

  if (event.target.dataset.action === 'library') {
    homeNavRef.classList.remove('current-page');
    libNavRef.classList.add('current-page');

    headerRef.classList.add('library-header');
  }
}

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;
}
