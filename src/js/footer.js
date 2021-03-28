import footerTmp from '../templates/footer.hbs';

function createFooter() {
  const footerItemsRef = document.querySelector('body');
  const footer = footerTmp();
  footerItemsRef.insertAdjacentHTML('beforeend', footer);
}

createFooter();
