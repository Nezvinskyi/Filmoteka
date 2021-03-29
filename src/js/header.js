import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';

const refs = getRefs();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();

const searchFormRef = document.getElementById('search-form');
const pagesNav = document.querySelector('.header-nav');

pagesNav.addEventListener('click', onNavClick);
searchFormRef.addEventListener('submit', onSearch);

function onNavClick(event) {
  console.log(event.target);
}

function onSearch(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.query.value;
  console.log('Текст запроса ====>', inputValue);
}
