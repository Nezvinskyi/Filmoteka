import teamModalTpl from '../templates/modal-team.hbs';
import getRefs from '../js/get-refs';


const refs = getRefs();

// 1додати івент-лисенер
// 2 написати колбек функцію addTeammodal

refs.teamModal.addEventListener('click', addTeamModal) 


function addTeamModal(event) {
  event.preventDefault();
  const markup = teamModalTpl();

  refs.teamModal.insertAdjacentHTML('afterbegin', markup);
}
// addTeamModal()





