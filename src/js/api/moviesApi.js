import settings from './settings';
import { paginator, getData, pageCounter } from '../components/pagination';

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
    this.searchYear = null;
    this.searchGenres = '';
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

  async init() {
    //'Стартовая загрузка'
    await this.getGenres();

    /* this.renderGalery() */
  }

  //тестирование динамических рефов
  getRefs() {
    const refs = {};
    refs.gallery = document.querySelector('.gallery-js');
    refs.header = document.querySelector('.header');
    refs.divContainer = document.querySelector('div[data-cont]');
    return refs;
  }

  async fetch(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw response.status;
      return await response.json();
    } catch (error) {
      console.log('error', error);
    }
  }

  //----------------------------------
  async getSearchYear(valueSearchYear) {
    this.searchYear = valueSearchYear;
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&year=${this.searchYear}`;
    //&with_genres=14 --жанры по ID
    //&year=2020-- фильмы выпущеные в конкретном году
    const searchYear = await this.fetch(url);
    return console.log(searchYear); //-поиск по году выпуска
  }

  async getSearchGenres(valueSearchGenres) {
    this.searchGenres = valueSearchGenres;
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&with_genres=${this.searchGenres}`;
    const searchGenres = await this.fetch(url);
    return console.log(searchGenres); //-поиск по жанру
  }
  //----------------------------------

  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const { genres } = await this.fetch(url);
    this.genres = genres;

    // console.log('возращает массив жанров', genres);

    return genres;
  }

  async getPopularMovies() {
    const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${pageCounter.page}`;
    if (this.page === 0) return;
    const popularMovies = await this.fetch(url);

    // console.log('возвращает массив популярных фильмов', popularMovies);

    return popularMovies;
  }

  async getById() {
    const url = `${BASE_URL}/movie/${this._movieId}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    const movie = await this.fetch(url);
    // console.log('возвращает объект фильма по id', movie);

    return movie;
  }

  async getMoviesByQuery() {
    // this.searchQuery = query;
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    /* if (this.searchQuery === '') return; */
    const movies = await this.fetch(url);
    // console.log('возвращает массив фильмов по поиску', movies);

    return movies;
  }

  renderGalery(markup, selector) {
    selector.insertAdjacentHTML('beforeend', markup);
  }

  renderModal(markup, selector) {
    selector.insertAdjacentHTML('beforeend', markup);
  }

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
