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

//перенесено в gallery
// refs.pagesNav.addEventListener('click', onNavClick);
// refs.searchForm.addEventListener('submit', onSearch); перенесено в gallery

//перенесено в gallery
// function onNavClick(event) {
//   if (event.target.dataset.action === 'home' || event.target.closest('svg')) {
// showLoader();
// refs.libNav.classList.remove('current-page');
// refs.homeNav.classList.add('current-page');
// refs.header.classList.remove('library-header');
// refs.searchForm.classList.remove('visually-hidden');
// refs.headerBtnWrapper.classList.add('visually-hidden');

//     // перенесено в gallery - запуск по клику перезапускает галлерею
//     //   moviesApi
//     //     .getPopularMovies()
//     //     .then(({ results }) => {
//     //       const movieDataList = results.map(item => movieAdapter(item));

//     //       moviesApi.getRefs().gallery.innerHTML = filmCard(movieDataList);
//     //       //
//     //       console.log('from home click. method:>>', moviesApi.fetchMethod);
//     //     })
//     //     .then(hideLoader)
//     //     .catch(onFetchError);
//   }

//   if (event.target.dataset.action === 'library') {
//     // !!! если не авторизовано, то модалка регистрации/входа

//     refs.homeNav.classList.remove('current-page');
//     refs.libNav.classList.add('current-page');
//     refs.header.classList.add('library-header');
//     refs.searchForm.classList.add('visually-hidden');
//     refs.headerBtnWrapper.classList.remove('visually-hidden');
//     refs.pagination.classList.add('visually-hidden');
//     const initLibraryMarkup = `<span class="library-inittext" style="text-align: center; display: block; margin-top: 25px">There’s nothing here, yet :( You should add something first</span>`;
//     moviesApi.getRefs().gallery.innerHTML = initLibraryMarkup;

//     getWatched();
//   }
// }

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
  if (pageYOffset > 250) {
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

// перенесено в gallery
// import cardList from '../templates/film-list.hbs';
// import { movieAdapterModal } from './helpers/index';

// function getWatched() {
//   let keys = Object.keys(localStorage);
//   let arr = [];
//   for (let key of keys) {
//     let keyName = `${key}`;
//     arr.push(keyName);
//   }
//   const localStorageKeys = arr.map(item => {
//     if (item === 'watched' || item === 'queue') {
//       let data = item;
//       return data;
//     }
//   });

//   if (localStorageKeys.includes('watched')) {
//     let arrayOfStrings = JSON.parse(localStorage.getItem('watched'));

//     if (arrayOfStrings === null && arrayOfStrings.length === 0) {
//       refs.btnWatched.classList.remove('btn-active-page');
//       const containerFilmRef = document.querySelector(
//         '[data-cont="container"]',
//       );
//       const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing in the QUEUE, yet :( You should add something first</span>`;
//       containerFilmRef.innerHTML = initLibraryMarkup;
//     } else {
//       let arrayOfStrings5 = JSON.parse(localStorage.getItem('watched'));
//       refs.btnWatched.classList.add('btn-active-page');
//       refs.btnQueue.classList.remove('btn-active-page');
//       renderFromLocalStorage(arrayOfStrings5);
//       return;
//     }
//   } else if (localStorageKeys.includes('queue')) {
//     refs.btnWatched.classList.remove('btn-active-page');
//     let arrayOfStrings = JSON.parse(localStorage.getItem('queue'));
//     if (arrayOfStrings === null && arrayOfStrings.length === 0) {
//       refs.btnWatched.classList.remove('btn-active-page');
//       const containerFilmRef = document.querySelector(
//         '[data-cont="container"]',
//       );
//       const initLibraryMarkup = `<span class="library-inittext"style="text-align: center; display: block; margin-top: 25px">There’s nothing here, yet :( You should add something first</span>`;
//       containerFilmRef.innerHTML = initLibraryMarkup;
//     } else {
//       let arrayOfStrings5 = JSON.parse(localStorage.getItem('queue'));
//       refs.btnQueue.classList.add('btn-active-page');
//       refs.btnWatched.classList.remove('btn-active-page');
//       renderFromLocalStorage(arrayOfStrings5);
//     }
//   } else {
//     refs.btnQueue.classList.remove('btn-active-page');
//     refs.btnWatched.classList.remove('btn-active-page');
//   }
// }

// function renderFromLocalStorage(arrayOfStrings) {
//   const movieDataList = arrayOfStrings.map(item => {
//     let data = movieAdapterModal(JSON.parse(item));
//     return data;
//   });
//   const containerFilmRef = document.querySelector('[data-cont="container"]');
//   containerFilmRef.innerHTML = cardList(movieDataList);
// }
// refs.btnWatched.addEventListener('click', getWatched);
// =================================================================

// import { AuthApp } from './auth';
// console.log(AuthApp);
