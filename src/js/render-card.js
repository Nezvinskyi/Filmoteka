import ApiMovie from './api/moviesApi'
const apiMovie = new ApiMovie();
console.log(apiMovie);

//------------------------------------------------------------------------------------
/* getGenre() -Жанры. Возвращает массив объектов */
console.log(apiMovie.getGenre());
apiMovie
    .getGenre()
    .then(({ genres }) => {
        console.log(genres);
        
    })
    .catch(err => console.log(err))
//------------------------------------------------------------------------------------
//getPopular()-возвращает популярные на сегодня
console.log(apiMovie.getPopular());
apiMovie
    .getPopular()
    .then(({ results }) => {
      console.log(results);
      /* renderCardMovie(results, galleryRef); */
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
    .catch(err => console.log(err))

// galleryRef - нужно значение что бы определить куда добавлять разметку карточек
// cardMovie - шаблон файл hbs

/* function renderCardMovie(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCardMovie(arr));
}

function createMarkupCardMovie(element) {
  return cardMovie(element);
} */
//------------------------------------------------------------------------------------
//.getById(valueId) - Возвращает значения, поиск по id для модалки
console.log(apiMovie.getById(791373));
apiMovie
    .getById(791373)
    .then(({ original_title,homepage, vote_average, vote_count, popularity, genres, overview}) => {
        console.log(original_title, homepage, vote_average, vote_count, popularity, genres, overview);
        renderCard(results, galleryRef); 
    })
    .catch(err => console.log(err))

//------------------------------------------------------------------------------------
//.getQuery(valueQuery) - Возвращает значения, поиск по ключевому слову для input
console.log(apiMovie.getQuery('soul'));
apiMovie
    .getQuery('soul')
    .then(({ results }) => {
        console.log(results);
        renderCard(results, galleryRef); 

    })
    .catch(err => console.log(err))