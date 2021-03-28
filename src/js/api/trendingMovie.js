import settings from './settings'

const { API_KEY, BASE_URL } = settings;
export default class ApiTrendingMovie{
  constructor() {
    this.mediaType = 'movie';
    this.timeWindow = 'day';
    this.page = 1;
  }
    
  async fetchReguest() {
    const url = `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}`;
    if (this.page === 0) return;
    const response = await fetch(url);
    if (!response.ok) throw response.status;
    return await response.json();
  }
  
  //`https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US`-жанры

  currentPage(value) {
    this.page = value;
    return this.fetchReguest();
  } 
    
  nextPage() {
    this.page += 1;
    return this.fetchReguest();
  }
    
  prevPage() {
    this.page -= 1;
    return this.fetchReguest();
  }  
}