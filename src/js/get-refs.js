export default function getRefs() {
  return {
    bodyRef: document.querySelector('body'),
    header: document.querySelector('.header'),
    pagesNav: document.querySelector('.header-nav'),
    homeNav: document.querySelector('.home-page-js'),
    libNav: document.querySelector('.library-page-js'),
    searchForm: document.getElementById('search-form'),
    headerBtnWrapper: document.querySelector('.wrapper-btn-header'),
  };
}
