import settings from './settings';
import film from '../film.json';

const { DB_AUTH_URL, DB_API, DB_URL } = settings;

class AuthUser {
  constructor() {
    this.token = '';
    this.userId = '';
  }

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
        console.log('Медведь пришел', this.userId);
      });
  }

  addToWatched(data) {
    const url = `${DB_URL}/users/${this.userId}/watched.json?auth=${this.token}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(console.log);
  }

  addToQueue(data) {}

  getAllData() {
    const url = `${DB_URL}/users/${this.userId}/watched.json?auth=${this.token}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(console.log);
  }
}

const authUser = new AuthUser();
export default authUser;
// authUser.signUp('mail@mail.od', '123456');
authUser.signIn('mail@mail.od', '123456');

setTimeout(() => {
  // authUser.addToWatched(film);
  // authUser.addToWatched(film);
  // authUser.getAllData();
  console.log(authUser.token);
}, 1000);

// при Добавить / библтиотека
// if (authUser.token === "") {
// 	открыть модалку регистрации
// }

// authUser.signUp('@', 'pass')
// authUser.signIn('@', 'pass')
