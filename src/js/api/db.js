import authUser from './auth';
import settings from './settings';

const { DB_URL } = settings;

import film from '../film.json';

class DbInterface {
  constructor() {
    this.watched = '';
  }

  addToWatched(data) {
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

  addToQueue(data) {}

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

    return allWatched;
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
    const watchedIds = Object.entries(data);
    const targetId = watchedIds.find(([id, obj]) => obj.id === movieId)[0];
    return targetId;
  }

  getFromStorage() {
    const parsedString = localStorage.getItem('watched-123');
    // console.log(JSON.parse(parsedString));
    // console.log(parsedString);
    // const a = Object.entries(parsedString);
    // console.log(a);
  }

  getDbId(data, movieId) {
    const watchedIds = Object.entries(data.watched);
    const targetId = watchedIds.find(([id, obj]) => obj.id === movieId)[0];
    return targetId;
  }
}
const dbUi = new DbInterface();
setTimeout(() => {
  // dbUi.addToWatched(film);
  dbUi.getAllWatchedData();
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
