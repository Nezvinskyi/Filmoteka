class DbInterface {
  constructor() {}

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
const dbUi = new dbInterface();
setTimeout(() => {
  // authUser.addToWatched(film);
  // authUser.addToWatched(film);
  // authUser.getAllData();
  // console.log(authUser.token);
}, 1000);
