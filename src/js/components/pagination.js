import pagination from 'pagination';
import paginationBtnsTpl from '../../templates/pagination.hbs';
import getRefs from '../get-refs';

const refs = getRefs();

export const paginator = new pagination.SearchPaginator({
  prelink: '/',
  current: 1,
  rowsPerPage: 20,
  totalResult: 530,
});

export function getData({ total }) {
  console.dir(paginator.getPaginationData());
  return paginator.getPaginationData();
}

let range = paginator.getPaginationData().range;
const lastPage = paginator.getPaginationData().last;
const markup = paginationBtnsTpl({ range, lastPage });
refs.bodyRef.insertAdjacentHTML('afterend', markup);

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

const paginationRef = document.querySelector('.pagination-js');

paginationRef.addEventListener('click', onPaginationClick);
function onPaginationClick(e) {
  if (!e.target.hasAttribute('data-nav') && !e.target.hasAttribute('data-num'))
    return;

  if (e.target.dataset.nav === 'prev') {
    if (pageCounter.page <= 1) return;
    pageCounter.decrement();
  } else if (e.target.dataset.nav === 'next') {
    if (pageCounter.page >= paginator.getPaginationData().last) return;
    pageCounter.increment();
  } else if (e.target.dataset.nav === 'last') {
    pageCounter.page = paginator.getPaginationData().last;
  } else {
    pageCounter.page = e.target.dataset.num;
  }

  paginator.set('current', pageCounter.page);
  range = paginator.getPaginationData().range;
  console.log('current page from Counter:>> ', pageCounter.page);
  console.log(
    'current page from Paginator:>>',
    paginator.getPaginationData().current,
  );

  paginationRef.innerHTML = paginationBtnsTpl({ range, lastPage });
}
