import { APROVE_MESSAGE, ERROR_MESSAGE, BUTTON_TEXT, DATABASE_URL, ERROR_SHOW_TIME } from './data.js';

const createLoader = (onSuccess, onError) => () => {
  return fetch(
    `${DATABASE_URL}/data`,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

export {createLoader};