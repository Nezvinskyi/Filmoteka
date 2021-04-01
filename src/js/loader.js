import moviesApi from './render-card';

export default function hideLoader() {
  moviesApi.getRefs().loader.classList.add('visually-hidden');
}
