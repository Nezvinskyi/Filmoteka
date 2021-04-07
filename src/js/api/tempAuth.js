import settings from './settings';

const { DB_URL, DB_API } = settings;

class DbUser {
  async signUp() {
    const url = `${DB_URL}?key=${DB_API}`;
    // console.warn(url);
    // const response = await fetch(url)
  }
}

const dbUser = new DbUser();
dbUser.signUp();
