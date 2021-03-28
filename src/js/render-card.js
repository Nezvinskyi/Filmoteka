import ApiTrendingMovie from './api/trendingMovie'
// galleryRef - нужно значение что бы определить куда добавлять разметку карточек
// cardMovie - шаблон файл hbs
const apiTrendingMovie = new ApiTrendingMovie();

apiTrendingMovie
  .fetchReguest()
  .then(({ results }) => {
      console.log(results);
      /* renderCardMovie(results, galleryRef); */
  })
  .catch(err => console.log(err))

/* function renderCardMovie(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCardMovie(arr));
}

function createMarkupCardMovie(element) {
  return cardMovie(element);
} */