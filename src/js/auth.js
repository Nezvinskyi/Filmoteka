import { onOpenModal } from './modal';
import markupAuth from '../html/auth-in-modal.html';
// ---------------------------------------
import firebase from 'firebase/app';

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
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static signInAuth(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static watchAuth() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        console.log('Вошел');
        this.userId = user.uid;
        console.log('userId ', this.userId);

        // получаем данные о библиотеке для загрузки в локал сторедж(id фильма)
      } else {
        console.log('Не вошел');
        this.userId = null;
        console.log('userId ', this.userId);
        // console.log(this.openModalAuth);
        // this.openModalAuth();
        // alert('Зарегистрируйтесь');
        // const email = prompt('Введите свой email');
        // const password = prompt('Введите пароль');
        // this.createAuth(email, password);
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
    const formRef = document.querySelector('.auth-form');

    formRef.addEventListener('submit', onSubmitInForm);
  }
}

function onSubmitInForm(event) {
  event.preventDefault();
  const email = event.currentTarget.elements[0].value;
  const password = event.currentTarget.elements[1].value;
  AuthApp.createAuth(email, password);
  // закрыть модалку
  // щчистить модалку
}

AuthApp.watchAuth();
