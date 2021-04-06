// db - все данные от фильмов на firebase
// делаем запрос - получаем объект
import db from './db.json';

// формирует массив айди фильмов для записи в localStorage
function getIdsfromWatched(data) {
  let arr = [];
  const a = Object.entries(data.watched);
  a.forEach(([id, obj]) => arr.push(obj.id));
  return arr;
}
console.log(getIdsfromWatched(db));
