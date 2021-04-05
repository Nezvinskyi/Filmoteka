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
  static isLoggedIn = 'hello';

  static createAuth(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  static singInAuth() {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  static watchAuth() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
      console.log('Сработал AthApp.checksAuth');
      if (user) {
        console.log('Вошел');
        console.log('isLoggedIn + до', AuthApp.isLoggedIn);
        this.isLoggedIn = true;
        console.log('isLoggedIn + после', AuthApp.isLoggedIn);
      } else {
        console.log('Не вошел');
        console.log('isLoggedIn - до', AuthApp.isLoggedIn);
        this.isLoggedIn = false;
        console.log('isLoggedIn - после', AuthApp.isLoggedIn);
        alert('Зарегистрируйтесь');
        const email = prompt('Введите свой email');
        const password = prompt('Введите пароль');
        this.createAuth(email, password);
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

  static displaysRegistrationForm() {
    // onOpenModal(markupAuth);
  }
}
