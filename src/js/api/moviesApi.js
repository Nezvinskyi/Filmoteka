import settings from './settings';
const { API_KEY, BASE_URL } = settings;
export default class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.mediaType = 'movie';
    this.timeWindow = 'day';
    this._movieId = '';
    this.page = 1;
    this.genres = [];
    this.init();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get movieId() {
    return this._movieId;
  }

  set movieId(newId) {
    this._movieId = newId;
  }

  init() {
    console.log('Стартовая загрузка');
    this.getGenres();
  }

  //тестирование динамических рефов
  getRefs() {
    const refs = {};
    refs.gallery = document.querySelector('.gallery-js');

    return refs;
  }

  async fetch(url) {
    const response = await fetch(url);

    return await response.json();
  }

  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const { genres } = await this.fetch(url);
    this.genres = genres;
    console.log('возращает массив жанров', genres);
    return genres;
  }

  async getPopularMovies() {
    const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}`;
    if (this.page === 0) return;
    const popularMovies = await this.fetch(url);
    console.log('возвращает массив популярных фильмов', popularMovies);
    return popularMovies;
  }

  async getById() {
    const url = `${BASE_URL}/movie/${this._movieId}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    const movie = await this.fetch(url);
    console.log('возвращает объект фильма по id', movie);
    return movie;
  }

  async getMoviesByQuery() {
    // this.searchQuery = query;
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    /* if (this.searchQuery === '') return; */
    const movies = await this.fetch(url);
    console.log('возвращает массив фильмов по поиску', movies);
    return movies;
  }

  renderGalery() {}

  renderModal() {}

  getPage(valuePage) {
    this.page = valuePage;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    if (this.page === 1) return;
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }
}
