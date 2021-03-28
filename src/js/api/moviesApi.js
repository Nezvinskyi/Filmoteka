import settings from './settings'
const { API_KEY, BASE_URL } = settings;
export default class ApiMovie {
    constructor() {
        this.query = '';
        this.mediaType = 'movie';
        this.timeWindow = 'day';
        this.movieId = '';
        this.page = 1;
        this.genres = [];
    }


  
    async fetchUrl(urlValue) {
        const response = await fetch(urlValue);
        if (!response.ok) throw response.status;
        return await response.json();
    };
  
    getGenre() {
        const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        return this.fetchUrl(url);
    }

  
  
    getPopular() {
        const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}`;
        if (this.page === 0) return;
        return this.fetchUrl(url);
    }
  
    getById(valueId) {
        this.movieId = valueId;
        const url = `${BASE_URL}/movie/${this.movieId}?api_key=${API_KEY}&language=en-US&page=${this.page}`;
        if (this.movieId === '') return;
        return this.fetchUrl(url);
    }
  
    getQuery(valueQuery) {
        this.query = valueQuery;
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`;
        if (this.query === '') return;
        return this.fetchUrl(url);
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
}