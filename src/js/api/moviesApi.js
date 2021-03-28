import settings from './settings'
const { API_KEY, BASE_URL } = settings;
export default class ApiMovie {
    constructor() {
        this.searchQuery = '';
        this.mediaType = 'movie';
        this.timeWindow = 'day';
        this.movieId = '';
        this.page = 1;
        this.genres = [];
        this.init();
    }

    init() {
      this.getGenre()
    }

    async fetchUrl(urlValue) {
        const response = await fetch(urlValue);
        if (!response.ok) throw response.status;
        return await response.json();
    };
  
    async getGenre() {
        const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        const { genres } = await this.fetchUrl(url);
        this.genres = genres;
    }
  
    async getPopular() {
        const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}`;
        if (this.page === 0) return;
        const data = await this.fetchUrl(url)
        return data;
    }
  
    async getById(id) {
        this.movieId = id;
        const url = `${BASE_URL}/movie/${this.movieId}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
        /*  if (this.movieId === '') return; */
        const movie = await this.fetchUrl(url)
        return movie;
    }
  
    async getMoviesByQuery(query) {
        this.searchQuery = query;
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
        /* if (this.searchQuery === '') return; */
        const movies = await this.fetchUrl(url);
        return movies;
    }

    renderGalery() { }

    renderModal() { }

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

    

    get query() {
      return this.searchQuery;
    }
    
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
}