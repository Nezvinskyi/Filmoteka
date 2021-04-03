import MoviesApi from './api/moviesApi';
const moviesApi = new MoviesApi();

export default moviesApi;

// // примеры использования
// // импорт: import moviesApi from './js/render-card';
// // (внимание: относительный путь)

// // получить массив жанров
// apiMovie.getGenres();

// // получить полулярные на сегодня
// apiMovie.getPopularMovies();

// // получить фильм по id
/* moviesApi.movieId = 67;

console.log(moviesApi.getById()); */

// // поиск по ключевому слову
// const queryFromInput = 'Odessa';
// apiMovie.searchQuery = queryFromInput;
// apiMovie.getMoviesByQuery();

// // получить данные для рендера модалки
// async function getDate() {
//   moviesApi.movieId = 67;
//   const { title, release_date } = await moviesApi.getById();
//   console.log(moviesApi.genres);
//   console.log(title, release_date);
// }
// getDate();

//получить данные по жанру и году
/* async function foo () {
  await moviesApi.getSearchYear(1972);
  await moviesApi.getSearchGenres('12, 28');
}
foo () */

//получить данные(часть ссылки для YouTube) по id фильма
/* async function foo() {
  console.log(moviesApi.getByVideo(791373));
} */
