import { onOpenModal } from '../modal';
import markupAuth from '../../html/auth-in-modal.html';
import { onError, onInfo } from '../components/notifications';
import settings from './settings';

const { DB_AUTH_URL, DB_API } = settings;

class AuthUser {
  constructor() {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
  }

  //регистрация
  async signUp(email, password) {
    let err = '';
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = `${DB_AUTH_URL}signUp?key=${DB_API}`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => (err = data.error));

    if (err) {
      console.log('err >>> ', err);
      onError(err.message);
    } else {
      this.signIn(email, password);
    }
  }

  //вход
  signIn(email, password) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = `${DB_AUTH_URL}signInWithPassword?key=${DB_API}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          this.token = data.idToken;
          this.userId = data.localId;
          localStorage.setItem('token', data.idToken);
          localStorage.setItem('userId', data.localId);

          onInfo('You have successfully logged in');
          document.querySelector('#auth-form-input-email').value = '';
          document.querySelector('#auth-form-input-password').value = '';
        } else {
          onError(data.error.message);
        }
      });
  }

  //открытие модалки
  openModalAuth() {
    onOpenModal(markupAuth);

    const btnSignInRef = document.querySelector('.auth-modal-btn-signin');
    const btnSignUpRef = document.querySelector('.auth-modal-btn-signup');
    const inputEmailRef = document.querySelector('#auth-form-input-email');
    const inputPasswordRef = document.querySelector(
      '#auth-form-input-password',
    );

    btnSignInRef.addEventListener('click', () => {
      const email = inputEmailRef.value;
      const password = inputPasswordRef.value;
      this.signIn(email, password);
    });

    btnSignUpRef.addEventListener('click', () => {
      const email = inputEmailRef.value;
      const password = inputPasswordRef.value;
      this.signUp(email, password);
    });
  }
}
const authUser = new AuthUser();
export default authUser;
