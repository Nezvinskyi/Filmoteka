import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';
import filmCard from '../templates/film-card.hbs';
import loaderTmplt from '../templates/loader.hbs';
import { hideLoader, showLoader } from './loader';
import { onError, onFetchError } from './components/notifications';

let refs = getRefs();

const loader = loaderTmplt();

// перенести в паршиалы html
function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
refs = getRefs();

refs.scrollUpEl.addEventListener('click', goUp);

window.addEventListener('scroll', function () {
  if (pageYOffset > 250) {
    refs.scrollUpEl.style.opacity = '1';
  } else {
    refs.scrollUpEl.style.opacity = '0';
  }
});

function goUp() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}
