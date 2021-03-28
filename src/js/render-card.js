import ApiMovie from './api/moviesApi'
const apiMovie = new ApiMovie();
/* console.log(apiMovie); */

//------------------------------------------------------------------------------------
/* getGenre() -Жанры. Возвращает массив объектов */
/* console.log(apiMovie.genres);
async function fu() {
  await apiMovie.getGenre();
  console.log(apiMovie.genres);
}
fu () */

//------------------------------------------------------------------------------------
//getPopular()-возвращает популярные на сегодня
/* console.log(apiMovie.getPopular());
async function foo() {
  await apiMovie.getPopular()
  .then(({ results }) => {
      console.log(results);
    
      function Callback (entries ) {
        entries .forEach(entry => {
          if (entry.release_date) {
            const d = new Date(entry.release_date);
            const year = d.getFullYear()
            console.log(year);
          }
        });
      }
      Callback (results)
    })

}
foo() */
