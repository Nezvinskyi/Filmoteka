import moviesApi from './render-card';
import video from '../templates/video.hbs';
import { movieAdapterVideo } from './helpers/index';

export default async function openVideo(movieId) {
  await moviesApi.getByVideo(movieId).then(({ results }) => {
    const oneResult = results.slice(0, 1);
    const videoSearch = oneResult.map(item => {
      return movieAdapterVideo(item);
    });

    moviesApi
      .getRefs()
      .divModalVideo.insertAdjacentHTML('afterbegin', video(videoSearch));
  });
}
