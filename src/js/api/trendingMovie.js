import settings from './settings'
// galleryRef - нужно значение что бы определить куда добавлять разметку карточек
// cardMovie - файл hbs
const { API_KEY, BASE_URL } = settings;
export default class ApiTrendingMovie{
  constructor() {
    this.mediaType = 'movie';
    this.timeWindow = 'day';
    this.page = 1;
  }
    
  async fetchReguest() {
    if (this.page === 0) return;
    const response = await fetch(this.createRequest());
    if (!response.ok) throw response.status;
    return await response.json();
  }  

  createRequest() {
    return `${BASE_URL}/trending/${this.mediaType}/${this.timeWindow}?api_key=${API_KEY}&page=${this.page}`;
  }
    
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

const apiTrendingMovie = new ApiTrendingMovie();

apiTrendingMovie
    .fetchReguest()
    .then(({ results }) => {
        console.log(results);
        renderCardMovie(results, galleryRef);
    })
    .catch(err => console.log(err))

function renderCardMovie(arr, selector) {
  return selector.insertAdjacentHTML('beforeend', createMarkupCardMovie(arr));
}

function createMarkupCardMovie(element) {
  return cardMovie(element);
}