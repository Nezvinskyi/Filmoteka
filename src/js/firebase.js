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
function getIdsfromQueue(data) {
  let arr = [];
  const watchedIds = Object.entries(data.queue);
  watchedIds.forEach(([id, obj]) => {
    arr.push(obj.id);
  });
  return arr;
}
getIdsfromWatched(db);
getIdsfromQueue(db);

// записывает полученный массив id фильмов в localStorage
function saveIdsToWatchedLocStor(idx) {
  localStorage.setItem('watched_2', JSON.stringify(idx));
}
function saveIdsToQueueLocStor(idx) {
  localStorage.setItem('queue_2', JSON.stringify(idx));
}

let watchedIdx = getIdsfromWatched(db);
let queuedIdx = getIdsfromQueue(db);
// saveIdsToWatchedLocStor(watchedIdx);
// saveIdsToQueueLocStor(queuedIdx);

//возвращает id записи в базе по id фильма
function getDbId(data, movieId) {
  const watchedIds = Object.entries(data.watched);
  const targetId = watchedIds.find(([id, obj]) => obj.id === movieId)[0];
  return targetId;
}
// console.log('2. найден фильм! id в базе:>>', getDbId(db, 148));

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
// console.log('3. Массив с обоими id:', getDbIds(db));

// поиск по id возвращает id из базы данных
function getById(id) {
  const dataFromLocalStorage = getDbIds(db);

  return dataFromLocalStorage.find(item => {
    if (item.movieId === id) {
      return item.dbId;
    }
  }).dbId;
}
// console.log('4. поиск по id(156):>>', getById(156));
// console.log('4. поиск по id(148):>>', getById(148));
