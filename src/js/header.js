import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();

const headerRef = document.querySelector('.header');
const pagesNav = document.querySelector('.header-nav');
const homeNavRef = document.querySelector('.home-page-js');
const libNavRef = document.querySelector('.library-page-js');
const searchFormRef = document.getElementById('search-form');
const btnWrapperRef = document.querySelector('.wrapper-btn-header');

pagesNav.addEventListener('click', onNavClick);
searchFormRef.addEventListener('submit', onSearch);

function onNavClick(event) {
  if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
    libNavRef.classList.remove('current-page');
    homeNavRef.classList.add('current-page');
    headerRef.classList.remove('library-header');
    searchFormRef.classList.remove('visually-hidden');
    btnWrapperRef.classList.add('visually-hidden');
  }

  if (event.target.dataset.action === 'library') {
    homeNavRef.classList.remove('current-page');
    libNavRef.classList.add('current-page');
    headerRef.classList.add('library-header');
    searchFormRef.classList.add('visually-hidden');
    btnWrapperRef.classList.remove('visually-hidden');
  }
}

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;
}
