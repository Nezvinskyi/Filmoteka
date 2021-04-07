import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
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
        color: 'white',
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
    {
      type: 'info',
      background: '#13c230',

      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'info',
        color: 'white',
      },
      // duration: 2000,
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

function onInfo(message) {
  notyf.open({
    type: 'info',
    message: message,
  });
}

export { onError, onFetchError, onInfo };
