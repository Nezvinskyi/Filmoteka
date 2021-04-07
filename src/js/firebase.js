// песочница по firebase

// делаем запрос на firebase - получаем объект:
// db - все данные от фильмов на firebase
import db from './db.json';

// формирует массив айди фильмов для записи в localStorage
function getIdsfromWatched(data) {
  let arr = [];
  const watchedIds = Object.entries(data.watched);
  watchedIds.forEach(([id, obj]) => arr.push(obj.id));
  return arr;
}
console.log('1. id фильмов, хранящихся в базе watched', getIdsfromWatched(db));

//возвращает id записи в базе по id фильма
function getDbId(data, movieId) {
  const watchedIds = Object.entries(data.watched);
  const targetId = watchedIds.find(([id, obj]) => obj.id === movieId)[0];
  return targetId;
}
console.log('2. найден фильм! id в базе:>>', getDbId(db, 148));

// второй вариант
// сразу сохраняем в localStorage оба id в объекте
function getDbIds(data) {
  let arr = [];
  const watchedIds = Object.entries(data.watched);
  return watchedIds.map(([idx, obj]) => {
    return {
      dbId: idx,
      movieId: obj.id,
    };
  });
}
console.log('3. Массив с обоими id:', getDbIds(db));

// поиск по id возвращает id из базы данных
function getById(id) {
  const dataFromLocalStorage = getDbIds(db);

  return dataFromLocalStorage.find(item => {
    if (item.movieId === id) {
      return item.dbId;
    }
  }).dbId;
}
console.log('4. поиск по id(148):>>', getById(156));
console.log('4. поиск по id(148):>>', getById(148));