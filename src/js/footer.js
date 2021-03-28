import footerTmp from '../templates/footer.hbs';

function craeteFooter() {
  const footerItemsRef = document.querySelector('body');
  const footer = footerTmp();
  footerItemsRef.insertAdjacentHTML('beforeend', footer);
}

craeteFooter();
