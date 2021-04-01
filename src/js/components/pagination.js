// //добавляет тестовые стили пагинации
import paginationBtnsTpl from '../../templates/pagination.hbs';
import getRefs from '../get-refs';

const refs = getRefs();

const markup = paginationBtnsTpl();
refs.header.insertAdjacentHTML('afterend', markup);
