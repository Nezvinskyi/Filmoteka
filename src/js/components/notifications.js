import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 20000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: '#ff6b08',

      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning',
      },
      // duration: 2000,
      dismissible: true,
    },
    {
      type: 'error',

      background: '#FF001B',
      // duration: 8000,
      dismissible: true,
    },
  ],
});

function onError() {
  notyf.open({
    type: 'warning',
    message:
      'Search result not successful. Please, enter correct movie name and try again',
  });
}

function onFetchError() {
  notyf.open({
    type: 'error',
    message: 'Ooops!Something went wrong :(',
  });
}

export { onError, onFetchError };
