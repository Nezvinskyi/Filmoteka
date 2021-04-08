import authUser from './auth';
import settings from './settings';

const { DB_URL } = settings;

// import film from '../film.json';
import {
  addClassBtnWached,
  deleteClassBtnWached,
  addClassBtnQueue,
  deleteClassBtnQueue,
} from '../api/storage';

class DbInterface {
  constructor() {
    this.watched = '';
    this.queue = '';
  }

  async getAllWatchedData() {
    const url = `${DB_URL}/users/${authUser.userId}/watched.json?auth=${authUser.token}`;

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

    this.watched = allWatched;

    let newArr = [];
    array.forEach(item => newArr.push(item[1]));
    localStorage.setItem('watched_fb', JSON.stringify(newArr));
    return newArr;
  }

  async dataWatchedHandler(movie) {
    await this.getAllWatchedData();
    const savedWatchedData = Object.entries(this.watched);

    if (
      this.watched === '' ||
      !savedWatchedData.find(([id, obj]) => obj.id === movie.id)
    ) {
      this.addToWatched(movie);
      addClassBtnWached();
      return false;
    } else {
      const targetId = savedWatchedData.find(
        ([id, obj]) => obj.id === movie.id,
      )[0];
      this.removeFromWatched(targetId);
      deleteClassBtnWached();
      return targetId;
    }
  }

  async addToWatched(data) {
    const url = `${DB_URL}/users/${authUser.userId}/watched.json?auth=${authUser.token}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => this.getAllWatchedData());
  }

  removeFromWatched(id) {
    const url = `${DB_URL}/users/${authUser.userId}/watched/${id}.json?auth=${authUser.token}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => this.getAllWatchedData());
  }

  async getAllQueueData() {
    const url = `${DB_URL}/users/${authUser.userId}/queue.json?auth=${authUser.token}`;

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

    this.queue = allQueue;

    let newArr = [];
    array.forEach(item => newArr.push(item[1]));
    localStorage.setItem('queue_fb', JSON.stringify(newArr));
    return newArr;
  }

  async dataQueueHandler(movie) {
    await this.getAllQueueData();
    const savedQueueData = Object.entries(this.queue);

    if (
      this.queue === '' ||
      !savedQueueData.find(([id, obj]) => obj.id === movie.id)
    ) {
      this.addToQueue(movie);
      addClassBtnQueue();
      return false;
    } else {
      const targetId = savedQueueData.find(
        ([id, obj]) => obj.id === movie.id,
      )[0];
      this.removeFromQueue(targetId);
      deleteClassBtnQueue();
      return targetId;
    }
  }

  async addToQueue(data) {
    const url = `${DB_URL}/users/${authUser.userId}/queue.json?auth=${authUser.token}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => this.getAllQueueData());
  }

  removeFromQueue(id) {
    const url = `${DB_URL}/users/${authUser.userId}/queue/${id}.json?auth=${authUser.token}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => this.getAllQueueData());
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
}
const dbUi = new DbInterface();
export default dbUi;
