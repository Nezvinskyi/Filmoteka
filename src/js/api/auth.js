import { onOpenModal } from '../modal';
import markupAuth from '../../html/auth-in-modal.html';
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

// export class AuthApp {
//   static userId = null;

//   static createAuth(email, password) {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         // Signed in
//         const user = userCredential.user;
//         document.querySelector('#auth-form-input-email').value = '';
//         document.querySelector('#auth-form-input-password').value = '';
//         console.log('Поздравляем! Ваш акаунт создан!');
//         console.log('Новый user >>>', user);
//         alert('Ваш акаунт создан');
//         // ...
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log('errorCode >>>>', errorCode);
//         console.log('errorMessage >>>>', errorMessage);
//         alert(`${errorCode}
//         ${errorMessage}`);
//         // ..
//       });
//   }

//   static signInAuth(email, password) {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         // Signed in
//         const user = userCredential.user;
//         document.querySelector('#auth-form-input-email').value = '';
//         document.querySelector('#auth-form-input-password').value = '';
//         console.log('Вы вошли в свой акаунт');
//         console.log('Ваш user >>>', user);
//         // ...
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log('errorCode >>>>', errorCode);
//         console.log('errorMessage >>>>', errorMessage);
//         alert(`${errorCode}
//         ${errorMessage}`);
//       });
//   }

//   static watchAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//       console.log('Проверка user >>>', user);
//       if (user) {
//         console.log('Вошел');
//         this.userId = user.uid;
//         console.log('userId ', this.userId);

//         // получаем данные о библиотеке для загрузки в локал сторедж(id фильма)
//       } else {
//         console.log('Не вошел');
//         this.userId = null;
//         console.log('userId ', this.userId);
//       }
//     });
//   }

//   static signOutAuth() {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         // Sign-out successful.
//       })
//       .catch(error => {
//         // An error happened.
//       });
//   }

//   static deleteAuth() {
//     const user = firebase.auth().currentUser;

//     user
//       .delete()
//       .then(function () {
//         // User deleted.
//       })
//       .catch(function (error) {
//         // An error happened.
//       });
//   }

//   static openModalAuth() {
//     onOpenModal(markupAuth);

//     const btnSignInRef = document.querySelector('.auth-modal-btn-signin');
//     const btnSignUpRef = document.querySelector('.auth-modal-btn-signup');
//     const inputEmailRef = document.querySelector('#auth-form-input-email');
//     const inputPasswordRef = document.querySelector(
//       '#auth-form-input-password',
//     );

//     btnSignInRef.addEventListener('click', () => {
//       const email = inputEmailRef.value;
//       const password = inputPasswordRef.value;
//       this.signInAuth(email, password);
//     });

//     btnSignUpRef.addEventListener('click', () => {
//       const email = inputEmailRef.value;
//       const password = inputPasswordRef.value;
//       this.createAuth(email, password);
//     });
//   }
// }

// AuthApp.watchAuth();

//==================================
import settings from './settings';

const { DB_AUTH_URL, DB_API } = settings;

class AuthUser {
  constructor() {
    this.token = '';
    this.userId = '';
  }

  //регистрация
  async signUp(email, password) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = `${DB_AUTH_URL}signUp?key=${DB_API}`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const dbUserData = response.json();
    console.log('data:>>', dbUserData);
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
        // console.log(data);
        this.token = data.idToken;
        this.userId = data.localId;
        // console.log('token', data.idToken);
        console.log('Медведь пришел. ID:', this.userId);
      });
  }
}

const authUser = new AuthUser();
export default authUser;

//взять из формы емейл и пароь и вызвать:
// authUser.signUp('mail@mail.od', '123456');
authUser.signIn('mail@mail.od', '123456');

// при Добавить / библтиотека
// if (authUser.token === "") {
// 	открыть модалку регистрации
// }

// authUser.signUp('@', 'pass')
// authUser.signIn('@', 'pass')
// setTimeout(() => {
//   console.warn(authUser.token);
// }, 1000);
