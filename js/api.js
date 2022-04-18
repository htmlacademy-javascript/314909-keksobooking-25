/* eslint-disable indent */
import { setAdFormActions } from './form-validations.js';
import { createPopup } from './popup.js';
import { APROVE_MESSAGE, ERROR_MESSAGE, BUTTON_TEXT, DATABASE_URL, ERROR_SHOW_TIME } from './data.js';

const showError = (error) => {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');
    errorContainer.textContent = error;

    document.body.append(errorContainer);

    setTimeout(() => {
        errorContainer.remove();
    }, ERROR_SHOW_TIME);
};

const getData = (onSuccess) => {
    fetch(`${DATABASE_URL}/data`, {
        method: 'GET',
        credentials: 'same-origin',
    },
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            createPopup(false, ERROR_MESSAGE, 'Добавить объявление');
            return [];
        })
        .then(onSuccess);
};

const sendData = (offer, onSuccess) =>
    fetch(
        DATABASE_URL,
        {
            method: 'POST',
            credentials: 'same-origin',
            body: offer,
        },
    )
        .then((response) => {
            if (response.ok) {
                createPopup(true, APROVE_MESSAGE);
                onSuccess();
                setAdFormActions();
            } else {
                createPopup(false, ERROR_MESSAGE, BUTTON_TEXT);
            }
        });

export { getData, sendData, showError };

