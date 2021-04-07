import { onOpenModal } from './modal';
import markupAuth from '../html/auth-in-modal.html';
// ---------------------------------------
import firebase from 'firebase/app';

import db from './db.json';
console.log(db);
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDn53btmBJPZDSPSp5tBFxkSuER-mlWeuM',
  authDomain: 'filmoteka-blended2.firebaseapp.com',
  projectId: 'filmoteka-blended2',
  storageBucket: 'filmoteka-blended2.appspot.com',
  messagingSenderId: '258840557786',
  appId: '1:258840557786:web:03f63f1bd48af8ad814de3',
};

firebase.initializeApp(firebaseConfig);

// -----------------------------------------

export class AuthApp {
  static userId = null;

  static createAuth(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        document.querySelector('#auth-form-input-email').value = '';
        document.querySelector('#auth-form-input-password').value = '';
        console.log('Поздравляем! Ваш акаунт создан!');
        console.log('Новый user >>>', user);
        alert('Ваш акаунт создан');
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode >>>>', errorCode);
        console.log('errorMessage >>>>', errorMessage);
        alert(`${errorCode}
        ${errorMessage}`);
        // ..
      });
  }

  static signInAuth(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        document.querySelector('#auth-form-input-email').value = '';
        document.querySelector('#auth-form-input-password').value = '';
        console.log('Вы вошли в свой акаунт');
        console.log('Ваш user >>>', user);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode >>>>', errorCode);
        console.log('errorMessage >>>>', errorMessage);
        alert(`${errorCode}
        ${errorMessage}`);
      });
  }

  static watchAuth() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('Проверка user >>>', user);
      if (user) {
        console.log('Вошел');
        this.userId = user.uid;
        console.log('userId ', this.userId);

        // получаем данные о библиотеке для загрузки в локал сторедж(id фильма)
      } else {
        console.log('Не вошел');
        this.userId = null;
        console.log('userId ', this.userId);
      }
    });
  }

  static signOutAuth() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  }

  static deleteAuth() {
    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(function () {
        // User deleted.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  static openModalAuth() {
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
      this.signInAuth(email, password);
    });

    btnSignUpRef.addEventListener('click', () => {
      const email = inputEmailRef.value;
      const password = inputPasswordRef.value;
      this.createAuth(email, password);
    });
  }
}

AuthApp.watchAuth();
// const database = firebase.database();
// firebase
//   .database()
//   .ref('users/' + 'userId')
//   .set({
//     username: 'name',
//     email: 'email',
//   });
// console.log(database);
