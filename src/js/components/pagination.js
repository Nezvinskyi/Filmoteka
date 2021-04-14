import pagination from 'pagination';

export const paginator = new pagination.SearchPaginator({
  prelink: '/',
  current: 1,
  rowsPerPage: 20,
  totalResult: 20,
});

//перенести в паршиал html
function setupPaginationContainer() {
  const markup =
    '<div class="pagination-container container pagination-js"></div>';
  document.querySelector('.footer').insertAdjacentHTML('beforebegin', markup);
}
setupPaginationContainer();

class PageCounter {
  constructor() {
    this._page = 1;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  increment() {
    this.page++;
  }

  decrement() {
    this.page--;
  }
}
export const pageCounter = new PageCounter();
