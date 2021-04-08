import settings from './settings';
import { paginator, getData, pageCounter } from '../components/pagination';

const { API_KEY, BASE_URL } = settings;

class MoviesApi {
  constructor() {
    this.searchQuery = '';
    this.mediaType = 'movie';
    this.timeWindow = 'day';
    this._movieId = '';
    this.page = 1;
    this.genres = [];
    this._searchYear = null;
    this._searchGenre = '';
    this.videoId = 0;
    this._fetchMethod = 'popular';
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

  get fetchMethod() {
    return this._fetchMethod;
  }

  set fetchMethod(newMethod) {
    this._fetchMethod = newMethod;
  }

  get searchGenre() {
    return this._searchGenre;
  }

  set searchGenre(newGenre) {
    this._searchGenre = newGenre;
  }

  get searchYear() {
    return this._searchYear;
  }

  set searchYear(newYear) {
    this._searchYear = newYear;
  }

  async init() {
    //'Стартовая загрузка'
    await this.getGenres();
  }

  getRefs() {
    const refs = {};
    refs.gallery = document.querySelector('.gallery-js');
    refs.header = document.querySelector('.header');
    refs.divContainer = document.querySelector('div[data-cont]');
    refs.listGenreModal = document.querySelector('#genre-search-container');
    refs.divModalVideo = document.querySelector('#modal-youtube');

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

  async getSearchYear() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&primary_release_year=${this._searchYear}&page=${pageCounter.page}`;
    const searchYear = await this.fetch(url);
    return searchYear;
  }

  async getSearchGenres() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&include_video=false&with_genres=${this._searchGenre}&page=${pageCounter.page}`;
    const searchGenres = await this.fetch(url);
    return searchGenres;
  }

  async getByVideo(valueVideo) {
    this.videoId = valueVideo;
    const url = `${BASE_URL}/movie/${this.videoId}/videos?api_key=${API_KEY}&language=en-US`;
    const searchPopular = await this.fetch(url);
    return searchPopular;
  }

  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const { genres } = await this.fetch(url);
    this.genres = genres;
    return genres;
  }

  async getPopularMovies() {
    const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${pageCounter.page}`;
    if (this.page === 0) return;
    const popularMovies = await this.fetch(url);

    return popularMovies;
  }

  async getById() {
    const url = `${BASE_URL}/movie/${this._movieId}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    const movie = await this.fetch(url);

    return movie;
  }

  async getMoviesByQuery() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${pageCounter.page}&include_adult=false`;
    const movies = await this.fetch(url);

    return movies;
  }

  // renderGalery(markup, selector) {
  //   selector.insertAdjacentHTML('beforeend', markup);
  // }

  // renderModal(markup, selector) {
  //   selector.insertAdjacentHTML('beforeend', markup);
  // }

  // getPage(valuePage) {
  //   this.page = valuePage;
  // }

  // incrementPage() {
  //   this.page += 1;
  // }

  // decrementPage() {
  //   if (this.page === 1) return;
  //   this.page -= 1;
  // }

  // resetPage() {
  //   this.page = 1;
  // }
}

const moviesApi = new MoviesApi();
export default moviesApi;
