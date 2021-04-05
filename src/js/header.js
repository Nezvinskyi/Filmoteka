import headerTplt from '../templates/header.hbs';
import getRefs from '../js/get-refs';
import { movieAdapter } from './helpers/index';
import filmCard from '../templates/film-card.hbs';
import moviesApi from './render-card';
import loaderTmplt from '../templates/loader.hbs';
import { hideLoader, showLoader } from './loader';
import { onError, onFetchError } from './components/notifications';

let refs = getRefs();

const loader = loaderTmplt();

function addHeader() {
  const markup = headerTplt();

  refs.bodyRef.insertAdjacentHTML('afterbegin', markup);
}

addHeader();
refs = getRefs();

refs.pagesNav.addEventListener('click', onNavClick);
// refs.searchForm.addEventListener('submit', onSearch); перенесено в gallery

function onNavClick(event) {
  if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
    showLoader();
    refs.libNav.classList.remove('current-page');
    refs.homeNav.classList.add('current-page');
    refs.header.classList.remove('library-header');
    refs.searchForm.classList.remove('visually-hidden');
    refs.headerBtnWrapper.classList.add('visually-hidden');

    // перенесено в gallery - запуск по клику перезапускает галлерею
    //   moviesApi
    //     .getPopularMovies()
    //     .then(({ results }) => {
    //       const movieDataList = results.map(item => movieAdapter(item));

    //       moviesApi.getRefs().gallery.innerHTML = filmCard(movieDataList);
    //       //
    //       console.log('from home click. method:>>', moviesApi.fetchMethod);
    //     })
    //     .then(hideLoader)
    //     .catch(onFetchError);
  }

  if (event.target.dataset.action === 'library') {
    refs.homeNav.classList.remove('current-page');
    refs.libNav.classList.add('current-page');
    refs.header.classList.add('library-header');
    refs.searchForm.classList.add('visually-hidden');
    refs.headerBtnWrapper.classList.remove('visually-hidden');
    refs.pagination.classList.add('visually-hidden');
    const initLibraryMarkup = `<span style="text-align: center; display: block; margin-top: 25px">There’s nothing here, yet :( You should add something first</span>`;
    moviesApi.getRefs().gallery.innerHTML = initLibraryMarkup;
    getWatched();
  }
}

// перенесено в gallery
// function onSearch(event) {
//   event.preventDefault();
//   moviesApi.fetchMethod = 'query';
//   console.log('from search. method:>>', moviesApi.fetchMethod);

//   showLoader();
//   // refs.loader.classList.remove('visually-hidden');

//   moviesApi.query = event.currentTarget.elements.query.value.trim();

//   if (moviesApi.query === '') {
//     hideLoader();
//     return onError();
//   }

//   moviesApi
//     .getMoviesByQuery()
//     .then(({ results }) => {
//       const movieDataList = results.map(item => movieAdapter(item));
//       if (movieDataList.length === 0) {
//         return onError();
//       }
//       moviesApi.getRefs().gallery.innerHTML = filmCard(movieDataList);
//       refs = getRefs();
//     })
//     .then(hideLoader)
//     .catch(onFetchError);

//   clearInput(event);
// }

function clearInput(event) {
  event.currentTarget.elements.query.value = '';
}

refs.scrollUpEl.addEventListener('click', goUp);

window.addEventListener('scroll', function () {
  if (pageYOffset > 700) {
    refs.scrollUpEl.style.opacity = '1';
  } else {
    refs.scrollUpEl.style.opacity = '0';
  }
});

function goUp() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

// =================================================================
// init link myLibrary - torkotiuk
import cardList from '../templates/film-list.hbs';
import { movieAdapterModal } from './helpers/index';
function getWatched() {
  let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));
  renderFromLocalStorage(arrayOfStrings);
  refs.btnWatched.classList.add('btn-active-page');
  refs.btnQueue.classList.remove('btn-active-page');
}
function renderFromLocalStorage(arrayOfStrings) {
  const movieDataList = arrayOfStrings.map(item => {
    let data = movieAdapterModal(JSON.parse(item));
    return data;
  });
  const containerFilmRef = document.querySelector('[data-cont="container"]');
  containerFilmRef.innerHTML = cardList(movieDataList);
}
refs.btnWatched.addEventListener('click', getWatched);
// =================================================================
