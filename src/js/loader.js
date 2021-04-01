import getRefs from '../js/get-refs';
let refs = getRefs();

export function hideLoader() {
  refs = getRefs();
  refs.loader.classList.add('visually-hidden');
}

export function showLoader() {
  refs = getRefs();
  refs.loader.classList.remove('visually-hidden');
}
