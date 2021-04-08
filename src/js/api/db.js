import authUser from './auth';
import settings from './settings';

const { DB_URL } = settings;

import film from '../film.json';

class DbInterface {
  constructor() {
    this.watched = '';
  }

  addToWatched(data) {
    const url = `${DB_URL}/users/${authUser.userId}/watched.json?auth=${authUser.token}`;
    console.warn('user:>>>>', authUser.userId);

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

  addToQueue(data) {
    const url = `${DB_URL}/users/${authUser.userId}/queue.json?auth=${authUser.token}`;

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

  removeFromWatched(id) {
    const url = `${DB_URL}/users/${authUser.userId}/watched/${id}.json?auth=${authUser.token}`;
    console.log('deleting.................', id);
    console.log('userId:>>>>', authUser.userId);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(console.log);
  }
  async getAllWatchedData() {
    const url = `${DB_URL}/users/${authUser.userId}/watched.json?auth=${authUser.token}`;
    let watched = null;
    const params = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    };
    const allWatched = await this.fetch(url, params);
    if (allWatched === null) {
      return;
    }

    const array = Object.entries(allWatched);

    this.watched = array;

    let newArr = [];
    array.forEach(item => newArr.push(item[1]));

    localStorage.setItem('watched_fb', JSON.stringify(newArr));
    return newArr;
  }

  async getAllQueueData() {
    const url = `${DB_URL}/users/${authUser.userId}/queue.json?auth=${authUser.token}`;
    let watched = null;
    const params = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    };
    const allQueue = await this.fetch(url, params);
    if (allQueue === null) {
      return;
    }

    const array = Object.entries(allQueue);

    this.watched = array;

    let newArr = [];
    array.forEach(item => newArr.push(item[1]));

    localStorage.setItem('queue_fb', JSON.stringify(newArr));
    return newArr;
  }

  render(data) {
    console.log(data);
  }

  async fetch(url, params) {
    try {
      const response = await fetch(url, params);
      if (!response.ok) throw response.status;
      return await response.json();
    } catch (error) {
      console.log('error', error);
    }
  }

  getDbId(movieId) {
    // const allWatched = JSON.parse(localStorage.getItem('watched_fb'));
    // console.warn(allWatched);
    // const newArr = [];

    // allWatched.forEach(item => {
    //   if (movieId !== item.id) {
    //     newArr.push(item);
    //   }
    // });

    // localStorage.setItem('watched_fb', JSON.stringify(newArr));

    // const watchedIds = Object.entries(movie);
    const targetId = this.watched.find(([id, obj]) => obj.id === movieId)[0];
    console.log('dsdsds', targetId);
    return targetId;
  }

  getFromStorage() {
    const parsedString = localStorage.getItem('watched-123');
    // console.log(JSON.parse(parsedString));
    // console.log(parsedString);
    // const a = Object.entries(parsedString);
    // console.log(a);
  }
}
const dbUi = new DbInterface();
setTimeout(() => {
  // dbUi.addToWatched(film);
  // dbUi.getAllWatchedData();
  // dbUi.removeFromWatched('-MXkFK85ZJhQV2yR6_2x');
  // console.log(authUser.token);
}, 1000);

dbUi.getFromStorage();

export default dbUi;
//todo
// при нажатии на кнопку add to watched:
// 0. проверка authUser.Id re
// 1. проверка наличия в БД
// 2. если есть - запуск dbUi.addToWatched(film)
// 3. если нет - запуск "delete from DB"
// 4. getAllWatchedData() - перезаписать
