import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

let refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
refs = getRefs();

// const headerRef = document.querySelector('.header');
// const pagesNav = document.querySelector('.header-nav');
// const homeNavRef = document.querySelector('.home-page-js');
// const libNavRef = document.querySelector('.library-page-js');
// const searchFormRef = document.getElementById('search-form');
// const btnWrapperRef = document.querySelector('.wrapper-btn-header');

refs.pagesNav.addEventListener('click', onNavClick);
refs.searchForm.addEventListener('submit', onSearch);

function onNavClick(event) {
  if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
    refs.libNav.classList.remove('current-page');
    refs.homeNav.classList.add('current-page');
    refs.header.classList.remove('library-header');
    refs.searchForm.classList.remove('visually-hidden');
    refs.headerBtnWrapper.classList.add('visually-hidden');
  }

  if (event.target.dataset.action === 'library') {
    refs.homeNav.classList.remove('current-page');
    refs.libNav.classList.add('current-page');
    refs.header.classList.add('library-header');
    refs.searchForm.classList.add('visually-hidden');
    refs.headerBtnWrapper.classList.remove('visually-hidden');
  }
}

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;
}
