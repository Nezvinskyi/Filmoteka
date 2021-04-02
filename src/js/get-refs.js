export default function getRefs() {
  return {
    bodyRef: document.querySelector('body'),
    header: document.querySelector('.header'),
    pagesNav: document.querySelector('.header-nav'),
    homeNav: document.querySelector('.home-page-js'),
    libNav: document.querySelector('.library-page-js'),
    searchForm: document.getElementById('search-form'),
    headerBtnWrapper: document.querySelector('.wrapper-btn-header'),
    teamModal: document.querySelector('.modal-team-js'),
    loader: document.querySelector('.loader'),
    // btnAddToWatched: document.querySelector('.js-addToWatched'),
    // btnAddToQueue: document.querySelector('.js-addToQueue'),
    btnWatched: document.querySelector('.js-watched'),
    btnQueue: document.querySelector('.js-queue'),
  };
}
